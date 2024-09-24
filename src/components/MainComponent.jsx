import React, { useContext, useReducer } from "react";
import { useForm } from "react-hook-form";
import BillFrom from "./BillFrom";
import Preview from "./Preview";
import img3 from "../assets/deleteicon.svg";
import img4 from "../assets/plusicon.svg";
import BillTo from "./BillTo";
import { invoiceReducer, initialState } from "../InvoiceContext/InvoiceReducer";
import CustomDropdown from "./CustomDropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

const MainComponent = () => {
  const {
    register,
    handleSubmit,
    setValue,
    unregister,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      companyName: "",
      companyEmail: "",
      country: "",
      city: "",
      postalCode: "",
      streetAddress: "",
      clientName: "",
      clientEmail: "",
      clientCountry: "",
      clientCity: "",
      clientPostalCode: "",
      clientStreetAddress: "",
      projectDescription: "",
      invoiceDate: new Date().toISOString().split("T")[0],
      paymentTerms: "",
      items: [],
      taxRate: 10,
    },
  });
  const [state, dispatch] = useReducer(invoiceReducer, initialState);
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const handleFieldChange = (field, value) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
  };
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...state.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    dispatch({ type: "UPDATE_ITEMS", payload: updatedItems });
  };
  const addItem = (e) => {
    e.preventDefault();
    const hasEmptyFields = state.items.some((item) => {
      return !item.itemName || !item.quantity || !item.price;
    });
    console.log(hasEmptyFields, "hasemptyfiedl");
    if (hasEmptyFields) {
      toast.error(
        "Please fill out all item fields (Name, Quantity, Price) before adding a new item."
      );

      return;
    }
    const newItem = { itemName: "", quantity: "", price: "", total: "" };
    dispatch({ type: "ADD_ITEM", payload: newItem });
  };

  const removeItem = (index) => {
    unregister(`items.${index}.itemName`);
    unregister(`items.${index}.quantity`);
    unregister(`items.${index}.price`);
    const updatedItems = state.items.filter((_, i) => i !== index);
    reset({
      items: updatedItems,
    });
    dispatch({ type: "REMOVE_ITEM", payload: updatedItems });
    toast.info("Item removed successfully!");
  };

  const handleReset = (e) => {
    e.preventDefault();
    dispatch({ type: "RESET_INVOICE" });
    reset({
      companyName: "",
      companyEmail: "",
      country: "",
      city: "",
      postalCode: "",
      streetAddress: "",
      clientName: "",
      clientEmail: "",
      clientCountry: "",
      clientCity: "",
      clientPostalCode: "",
      clientStreetAddress: "",
      projectDescription: "",
      invoiceDate: new Date().toISOString().split("T")[0],
      paymentTerms: "",
      items: [],
      taxRate: 10,
    });
  };

  const onSubmit = (data) => {
    if (state.items.length === 0) {
      toast.error("You must add at least one item.");
      return;
    }
    const existingData = JSON.parse(localStorage.getItem("invoiceData")) || [];
    const dataToStore = Array.isArray(existingData) ? existingData : [];
    dataToStore.push(data);
    localStorage.setItem("invoiceData", JSON.stringify(dataToStore));
    toast.success("Invoice saved successfully!");
    reset(); 
    dispatch({ type: "RESET_INVOICE" });
  };

  return (
    <>
      <Navbar reset={handleReset} onSubmit={handleSubmit(onSubmit)} />
      <div className="max-w-[1440px] w-full  p-4 flex flex-col md:flex-row gap-8 mx-auto bg-white items-center">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
        <div className="w-[1376px] h-[1162px] grid grid-cols-12 gap-5 mx-auto">
          {/* Left section: Form */}
          <div className="col-span-6 bg-white rounded-3xl ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full min-h-[1076px] rounded-3xl border py-5">
                {/* Bill From Section */}
                <BillFrom
                  state={state}
                  register={register}
                  errors={errors}
                  handleFieldChange={handleFieldChange}
                  setValue={setValue}
                />
                <div className="w-[628px] h-[296px] mt-4 mx-auto">
                  <BillTo
                    state={state}
                    register={register}
                    errors={errors}
                    handleFieldChange={handleFieldChange}
                    setValue={setValue}
                  />
                </div>
            {/* Invoice Details */}
                <div className="w-[628px] h-[165px] mx-auto mt-10">
                  <div className="w-full h-[164px] flex flex-col gap-5 justify-center ">
                    <div className="flex   justify-center  items-center gap-3">
                      <div className="w-[306px] flex flex-col  ">
                        <label htmlFor="invoiceDate" className="text-[#344054]">
                          Invoice Date
                        </label>
                        <input
                          type="date"
                          id="invoiceDate"
                          className="border p-2 h-[41.6px]  w-full rounded-lg focus:outline-none"
                          value={state.invoiceDate || currentDate || ""}
                          {...register("invoiceDate", {
                            required: "InvoiceDate is required",
                          })}
                          onChange={(e) =>
                            handleFieldChange("invoiceDate", e.target.value)
                          }
                        />
                        {errors.invoiceDate && (
                          <p className="text-red-600 ">
                            {errors.invoiceDate.message}
                          </p>
                        )}
                      </div>

                      <div className=" w-[306px] flex flex-col ">
                        <CustomDropdown
                          label="Payment Terms"
                          options={[
                            "Net 10 Days",
                            "Net 20 Days",
                            "Net 30 Days",
                          ]}
                          value={state.paymentTerms || ""}
                          onChange={(value) => {
                            handleFieldChange("paymentTerms", value);
                            setValue("paymentTerms", value); // Updating form value in React Hook Form
                          }}
                          register={register}
                          name="paymentTerms"
                          defaultText="Select Term"
                          rules={{ required: "Payment Terms is required" }}
                        />
                        {errors.paymentTerms && (
                          <p className="text-red-600">
                            {errors.paymentTerms.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="w-full flex-col ">
                      <label
                        htmlFor="projectDescription"
                        className="text-[#344054]"
                      >
                        Project Description
                      </label>
                      <input
                        type="text"
                        name="projectDescription"
                        id="projectDescription"
                        className="border p-2  w-full rounded-lg focus:outline-none"
                        value={state.projectDescription || ""}
                        {...register("projectDescription", {
                          required: "Project Description is required",
                        })}
                        onChange={(e) =>
                          handleFieldChange(
                            "projectDescription",
                            e.target.value
                          )
                        }
                      />
                      {errors.projectDescription && (
                        <p className="text-red-600">
                          {errors.projectDescription.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              <div className="w-[628px] mt-4  mx-auto">
                  <h2 className="text-xl font-bold  ">Items List</h2>
                  <div className="w-full ">
                    {state.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 my-4 "
                      >
                        <div className="w-[210px] h-[80px] flex flex-col ">
                          <label htmlFor="itemname" className="text-[#344054]">
                            Item Name
                          </label>
                          <input
                            id="itemname"
                            type="text"
                            {...register(`items.${index}.itemName`, {
                              required: "Item Name is required",
                            })}
                            value={item.itemName || ""}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "itemName",
                                e.target.value
                              )
                            }
                            className="border p-2 w-[200px] focus:outline-none  rounded-lg bg-white"
                          />
                          {errors.items?.[index]?.itemName && (
                            <p className="text-red-600">
                              {errors.items[index].itemName.message}
                            </p>
                          )}
                        </div>
                        <div className="w-[110px] h-[80px] flex flex-col ">
                          <label
                            htmlFor={`quantity-${index}`}
                            className="text-[#344054]"
                          >
                            Quantity
                          </label>
                          <input
                            id={`quantity-${index}`}
                            type="text"
                            {...register(`items.${index}.quantity`, {
                              required: "Quantity is required",
                              min: {
                                value: 1,
                                message: "Quantity must be at least 1",
                              },
                              valueAsNumber: true,
                              validate: (value) =>
                                !isNaN(value) || "Quantity must be a number",
                            })}
                            value={item.quantity || ""}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "quantity",
                                e.target.value
                              )
                            }
                            className="border p-2 w-[100px]  rounded-lg bg-white"
                          />

                          {errors.items?.[index]?.quantity && (
                            <p className="text-red-600">
                              {errors.items[index].quantity.message}
                            </p>
                          )}
                        </div>
                        <div className="w-[110px] h-[80px] flex flex-col ">
                          <label
                            htmlFor={`price-${index}`}
                            className="text-[#344054]"
                          >
                            Price
                          </label>
                          <input
                            id={`price-${index}`}
                            type="text"
                            {...register(`items.${index}.price`, {
                              required: "Price is required",
                              min: {
                                value: 0.01,
                                message: "Price must be greater than 0",
                              },
                              valueAsNumber: true,
                              validate: (value) =>
                                !isNaN(value) || "Price must be a number",
                            })}
                            value={item.price || ""}
                            onChange={(e) =>
                              handleItemChange(index, "price", e.target.value)
                            }
                            className="border p-2 w-[100px] focus:outline-none  rounded-lg bg-white"
                          />

                          {errors.items?.[index]?.price && (
                            <p className="text-red-600">
                              {errors.items[index].price.message}
                            </p>
                          )}
                        </div>
                        <div className="w-[110px] h-[80px] flex flex-col ">
                          <label
                            htmlFor={`total-${index}`}
                            className="text-[#344054]"
                          >
                            Total
                          </label>
                          <input
                            id={`total-${index}`}
                            type="text"
                            value={
                              item.quantity && item.price
                                ? `$${(item.quantity * item.price).toFixed(2)}`
                                : ""
                            }
                            className="border p-2 w-[100px] focus:outline-none rounded-lg"
                            disabled
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="h-1"
                        >
                          <span className="w-[18px] h-[20px]">
                            <img src={img3} alt="Delete icon" />
                          </span>
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addItem}
                      className="w-full bg-[#7F56D9] text-white px-2 py-1 rounded flex items-center gap-2 justify-center mt-4"
                    >
                      {" "}
                      <span>
                        {" "}
                        <img src={img4} alt="plusicon " />
                      </span>
                      Add Item
                    </button>
                  </div>
              </div>
              </div>
            </form>
          </div>
          {/* Right section: Preview */}
          <div className="col-span-6  rounded-3xl min-h-[1076px] ">
            <Preview state={state} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainComponent;
