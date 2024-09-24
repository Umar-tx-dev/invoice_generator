// BillTo.js
import React from "react";
import CustomDropdown from "./CustomDropdown";

const BillTo = ({ state, register, errors, handleFieldChange,setValue }) => {
  return (
    <div className="w-[628px] h-[296px] mx-auto mt-4">
      <h2 className="text-xl font-bold mb-4">Bill To</h2>
      <div className="w-full h-[260px] flex flex-col gap-3 ">
        <div className="w-[628px] h-[80px] flex justify-center gap-4">
          <div className="w-[306px] flex flex-col ">
            <label htmlFor="clientName" className="text-[#344054]">
              Client's Name
            </label>
            <input
              type="text"
              id="clientName"
              className="border p-2 w-full rounded-lg focus:outline-none"
              value={state.clientName || ""}
              {...register("clientName", {
                required: "Client's Name is required",
              })}
              onChange={(e) => handleFieldChange("clientName", e.target.value)}
            />
            {errors.clientName && (
              <p className="text-red-600">{errors.clientName.message}</p>
            )}
          </div>
          <div className="w-[306px] flex flex-col ">
            <label htmlFor="clientEmail" className="text-[#344054]">
              Client's Email
            </label>
            <input
              type="text"
              id="clientEmail"
              className="border p-2 w-full rounded-lg focus:outline-none"
              value={state.clientEmail || ""}
              {...register("clientEmail", {
                required: "Client's Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email format",
                },
              })}
              onChange={(e) => handleFieldChange("clientEmail", e.target.value)}
            />
            {errors.clientEmail && (
              <p className="text-red-600">{errors.clientEmail.message}</p>
            )}
          </div>
        </div>

        <div className="w-[628px] h-[260px] flex justify-center gap-4">
          <div className="w-[202px] flex flex-col ">
            <CustomDropdown
              label="Country"
              options={["United States", "Canada","India"]}
              value={state.clientCountry || ""}
              onChange={(value) => {
                handleFieldChange("clientCountry", value);
                setValue("clientCountry", value); 
              }}
              register={register}
              name="clientCountry"
              rules={{ required: "Client country is required" }}
            />
            {errors.clientCountry && (
              <p className="text-red-600">{errors.clientCountry.message}</p>
            )}
          </div>
          <div className="w-[202px] flex flex-col ">
            <label htmlFor="clientCity" className="text-[#344054]">
              City
            </label>
            <input
              type="text"
              id="clientCity"
              className="border p-2 w-full rounded-lg focus:outline-none"
              value={state.clientCity || ""}
              {...register("clientCity", { required: "City is required" })}
              onChange={(e) => handleFieldChange("clientCity", e.target.value)}
            />
            {errors.clientCity && (
              <p className="text-red-600">{errors.clientCity.message}</p>
            )}
          </div>
          <div className="w-[202px] flex flex-col ">
            <label htmlFor="clientPostalCode" className="text-[#344054]">
              Postal Code
            </label>
            <input
              type="text"
              id="clientPostalCode"
              className="border p-2 w-full rounded-lg focus:outline-none"
              value={state.clientPostalCode || ""}
              {...register("clientPostalCode", {
                required: "Postal Code is required",
              })}
              onChange={(e) =>
                handleFieldChange("clientPostalCode", e.target.value)
              }
            />
            {errors.clientPostalCode && (
              <p className="text-red-600">{errors.clientPostalCode.message}</p>
            )}
          </div>
        </div>

        <div className="w-[628px] h-[80px] flex flex-col ">
          <label htmlFor="clientStreetAddress" className="text-[#344054]">
            Street Address
          </label>
          <input
            type="text"
            id="clientStreetAddress"
            className="border p-2 w-full rounded-lg focus:outline-none"
            value={state.clientStreetAddress || ""}
            {...register("clientStreetAddress", {
              required: "Street Address is required",
            })}
            onChange={(e) =>
              handleFieldChange("clientStreetAddress", e.target.value)
            }
          />
          {errors.clientStreetAddress && (
            <p className="text-red-600">{errors.clientStreetAddress.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillTo;
