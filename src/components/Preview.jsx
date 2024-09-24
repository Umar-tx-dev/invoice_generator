import React from "react";

const Preview = ({ state }) => {
  const {
    items,
    invoiceDate,
    paymentTerms,
    companyName,
    companyEmail,
    country,
    city,
    postalCode,
    streetAddress,
    clientName,
    clientEmail,
    clientCountry,
    clientCity,
    clientPostalCode,
    clientStreetAddress,
    projectDescription,
    taxRate = 10,
  } = state;

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };
  const formattedInvoiceDate = invoiceDate
    ? new Date(invoiceDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : new Date(getCurrentDate()).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
  const calculateTotal = () => {
    return items.reduce((acc, item) => {
      const quantity = item.quantity || 0;
      const price = item.price || 0;
      return acc + quantity * price;
    }, 0);
  };
  const calculateTax = (total) => {
    return (total * (taxRate || 0)) / 100;
  };

  const total = calculateTotal();
  const tax = calculateTax(total);
  const grandTotal = total + tax;
  return (
    <div className="w-[676px] min-h-[1076px]  flex flex-col gap-4 border py-4 bg-[#F5F5F5] rounded-3xl">
      <h1 className="w-[628px] text-2xl font-semibold mx-auto">Preview</h1>
      <div className="w-full  flex justify-center py-5">
        <div className="w-[628px] max-h-[800px] p-6 border rounded-2xl shadow-lg bg-white">
          <div className="w-[580px]">
            <div className="border-b border-[#EAECF0]">
              <h2 className="text-lg font-semibold mb-2">New Invoice</h2>
            </div>
            <div className="w-[580px] max-h-[320px] mt-4">
              <div className="w-[580px] h-[76px] flex gap-4">
                <div className="w-[282px] flex flex-col gap-2">
                  <span className="text-[16px] text-[#76787D]">
                    Invoice Date:
                  </span>
                  <p>{formattedInvoiceDate}</p>
                </div>
                <div className="w-[282px] flex flex-col gap-2">
                  <span className="text-[16px] text-[#76787D]">
                    Payment Terms:
                  </span>
                  <p>{paymentTerms}</p>
                </div>
              </div>
              <div className="w-[580px]  flex gap-4">
                <div className="w-[282px]  flex flex-col gap-2">
                  <span className="text-[16px] text-[#76787D]">
                    Billed From:
                  </span>
                  <p>{companyName}</p>
                  <p>{companyEmail}</p>
                  <p>{country}</p>
                  <p>{city}</p>
                  <p>{postalCode}</p>
                  <p>{streetAddress}</p>
                </div>
                <div className="w-[282px] flex flex-col gap-2">
                  <span className="text-[16px] text-[#76787D]">Billed To:</span>
                  <p>{clientName}</p>
                  <p>{clientEmail}</p>
                  <p>{clientCountry}</p>
                  <p>{clientCity}</p>
                  <p>{clientPostalCode}</p>
                  <p>{clientStreetAddress}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[290px] h-[76px] flex flex-col gap-2">
            <span className="text-[16px] text-[#76787D]">
              Project Description:
            </span>
            <p>{projectDescription}</p>
          </div>
          <div className="w-[580px] min-h-[50px] border-b">
            <div className="w-[580px] h-[38px] flex bg-[#F5F5F5] justify-between items-center p-4 text-[#76787D]">
              <p className="w-100px">Item</p>
              <p className="w-100px">Qty</p>
              <p className="w-100px">Price</p>
              <p className="w-100px">Total Amount</p>
            </div>
            <ul>
              {items.map((item, index) => (
                <li
                  key={index}
                  className="flex w-[580px] h-[38px] justify-between gap-4 items-center p-4"
                >
                  <p className="w-[100px]">{item.itemName}</p>
                  <p className="w-[100px] pl-2">{item.quantity}</p>
                  <p className="w-[100px] pl-2">
                    {item.price ? `$ ${item.price}` : ""}
                  </p>
                  <p className="w-[100px] text-center">
                    {item.quantity && item.price
                      ? `$ ${(item.quantity * item.price).toFixed(2)}`
                      : ""}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[580px] h-[114px] flex justify-end items-end flex-col">
            <p className="mt-4 flex justify-between w-[260px]">
              Subtotal <span>$ {total.toFixed(2)}</span>
            </p>
            <p className="mt-4 flex justify-between w-[260px]">
              Tax: <span>{taxRate}%</span>
            </p>
            <p className="font-bold mt-4 flex justify-between w-[260px]">
              Total: <span>$ {grandTotal.toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
