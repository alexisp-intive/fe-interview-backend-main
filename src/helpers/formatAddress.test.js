import { formatAddress } from "./formatAddress";

describe("formatAddress", () => {
  test("formats the address correctly", () => {
    const address = {
      address1: "123 Main St",
      city: "Anytown",
      state: "CA",
      postalCode: "12345",
      address2: "Suite 100",
    };
    const formattedAddress = formatAddress(address);
    expect(formattedAddress).toBe("123 Main St, Anytown, CA, 12345, Suite 100");
  });

  test("returns an empty string if no address is provided", () => {
    const formattedAddress = formatAddress();
    expect(formattedAddress).toBe("");
  });

  test("handles missing address fields correctly", () => {
    const address = {
      address1: "123 Main St",
      state: "CA",
    };
    const formattedAddress = formatAddress(address);
    expect(formattedAddress).toBe("123 Main St, CA");
  });

  test("ignores undefined and null values in the address object", () => {
    const address = {
      address1: "123 Main St",
      city: null,
      state: "CA",
      postalCode: undefined,
      address2: "",
    };
    const formattedAddress = formatAddress(address);
    expect(formattedAddress).toBe("123 Main St, CA");
  });
});
