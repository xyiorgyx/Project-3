import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER_CAR } from "../../utils/mutations";
import Auth from "../../utils/Auth";
import { QUERY_ME } from "../../utils/queries";

const CarForm = () => {
  const [formState, setFormState] = useState({
    license_plate: "",
    make: "",
    model: "",
    color: "",
    owner: Auth.getProfile().data.username,
  });
  const [addUserCar, { error, date }] = useMutation(ADD_USER_CAR, {
    update(cache, { data: { addUserCar } }) {
      try {
        const { me } = cache.readQuery({
          query: QUERY_ME,
        });
        console.log({ me });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { cars: [...me.cars, addUserCar] } },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUserCar({
        variables: {
          ...formState,
        },
      });
    } catch (e) {
      console.error(e);
    }
    setFormState({
      license_plate: "",
      make: "",
      model: "",
      color: "",
      owner: Auth.getProfile().data.username,
    });
  };
  console.log(formState);
  return (
    <>
      <main className="bg-gray-50 dark:bg-gray-900 p-6   ">
      <h2 className="p-6 text-center text-xl text-blue-500 font-bold uppercase">Vehicle Information</h2>
        <form
          onSubmit={handleFormSubmit}
          action="#"
          className="p-6 max-w-lg rounded-lg flex flex-col  mx-auto md:h-screen lg:py-0"
        >
          <div className="bg-gray-200  ">
            {/* <h2 className="p-6 text-center">Vehicle Information</h2> */}
            <div className=" border p-6 ">
              <div className="">
                <div className="w-full md:w-1/2 px-4 mb-2 md:mb-0">
                  <label className="block uppercase tracking-wide  text-xs font-bold mb-2">
                    Car Model
                  </label>
                  <input
                    value={formState.model}
                    name="model"
                    onChange={handleChange}
                    type="text"
                    placeholder="Car Model"
                    className="appearance-none block w-full  text-gray-700 border border-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    required=""
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3">
                  Car Make
                </label>
                <input
                  value={formState.make}
                  name="make"
                  onChange={handleChange}
                  type="text"
                  placeholder="Car Make"
                  className="appearance-none block w-full  text-gray-700 border border-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  required=""
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3">
                  Car Color
                </label>

                <input
                  value={formState.color}
                  name="color"
                  onChange={handleChange}
                  type="text"
                  placeholder="Car Color"
                  className="appearance-none block w-full  text-gray-700 border border-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  required=""
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3">
                  License Number
                </label>
                <input
                  value={formState.license_plate}
                  name="license_plate"
                  onChange={handleChange}
                  type="text"
                  placeholder="Car License"
                  required=""
                  className="appearance-none block w-full  text-gray-700 border border-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
                <button
                  type="submit"
                  className="btn border p-2 bg-blue-500 btn-lg btn-light  text-xs font-bold text-center rounded-lg  uppercase text-white m-2"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default CarForm;