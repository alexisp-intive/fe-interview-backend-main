export const formatAddress = ({
  address1,
  city,
  state,
  postalCode,
  address2,
} = {}) =>
  [address1, city, state, postalCode, address2].filter(Boolean).join(", ");
