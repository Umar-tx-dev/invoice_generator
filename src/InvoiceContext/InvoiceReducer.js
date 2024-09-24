// Initial state
export const initialState = {
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
};

// Reducer function to manage state updates
export const invoiceReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "UPDATE_ITEMS":
      return {
        ...state,
        items: action.payload,
      };
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: action.payload,
      };
    case "RESET_INVOICE":
      return {
        initialState,
        items: [],
      };

    default:
      return state;
  }
};
