// BillFrom.js
import React from "react";
import CustomDropdown from "./CustomDropdown";

const BillFrom = ({ state, register, errors, handleFieldChange, setValue }) => {
  return (
    <div className="w-[628px] h-[296px] mx-auto">
      <h2 className="text-xl font-bold mb-4">Bill From</h2>
      <div className="w-full h-[260px] flex flex-col gap-3 ">
        <div className="w-[628px] h-[80px] flex justify-center gap-4">
          <div className="w-[306px] flex flex-col ">
            <label htmlFor="companyName" className="text-[#344054]">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              className="border p-2 w-full rounded-lg focus:outline-none"
              value={state.companyName || ""}
              {...register("companyName", {
                required: "Company name is required",
              })}
              onChange={(e) => handleFieldChange("companyName", e.target.value)}
            />
            {errors.companyName && (
              <p className="text-red-600">{errors.companyName.message}</p>
            )}
          </div>
          <div className="w-[306px] flex flex-col ">
            <label htmlFor="companyEmail" className="text-[#344054]">
              Company Email
            </label>
            <input
              type="text"
              id="companyEmail"
              className="border p-2 w-full rounded-lg focus:outline-none"
              value={state.companyEmail || ""}
              {...register("companyEmail", {
                required: "Company email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email format",
                },
              })}
              onChange={(e) =>
                handleFieldChange("companyEmail", e.target.value)
              }
            />
            {errors.companyEmail && (
              <p className="text-red-600">{errors.companyEmail.message}</p>
            )}
          </div>
        </div>

        <div className="w-[628px] h-[80px] flex justify-center gap-4">
          <div className="w-[202px] flex flex-col ">
            <CustomDropdown
              label="Country"
              options={["United States", "Canada","India"]}
              value={state.country || ""}
              onChange={(value) => {
                handleFieldChange("country", value);
                setValue("country", value); 
              }}
              register={register}
              name="country"
              rules={{ required: "Country is required" }}
            />
            {errors.country && (
              <p className="text-red-600">{errors.country.message}</p>
            )}
          </div>
          <div className="w-[202px] flex flex-col ">
            <label htmlFor="city" className="text-[#344054]">
              City
            </label>
            <input
              type="text"
              id="city"
              className="border p-2 w-full rounded-lg focus:outline-none"
              value={state.city || ""}
              {...register("city", { required: "City is required" })}
              onChange={(e) => handleFieldChange("city", e.target.value)}
            />
            {errors.city && (
              <p className="text-red-600">{errors.city.message}</p>
            )}
          </div>
          <div className="w-[202px] flex flex-col ">
            <label htmlFor="postalCode" className="text-[#344054]">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              className="border p-2 w-full rounded-lg focus:outline-none"
              value={state.postalCode || ""}
              {...register("postalCode", {
                required: "Postal Code is required",
              })}
              onChange={(e) => handleFieldChange("postalCode", e.target.value)}
            />
            {errors.postalCode && (
              <p className="text-red-600">{errors.postalCode.message}</p>
            )}
          </div>
        </div>

        <div className="w-[628px] h-[80px] flex flex-col ">
          <label htmlFor="streetAddress" className="text-[#344054]">
            Street Address
          </label>
          <input
            type="text"
            id="streetAddress"
            className="border p-2 w-full rounded-lg focus:outline-none"
            value={state.streetAddress || ""}
            {...register("streetAddress", {
              required: "Street Address is required",
            })}
            onChange={(e) => handleFieldChange("streetAddress", e.target.value)}
          />
          {errors.streetAddress && (
            <p className="text-red-600">{errors.streetAddress.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillFrom;
