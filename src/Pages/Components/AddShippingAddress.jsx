import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const AddShippingAddress = () => {
  const [state, setState] = useState("none");
  const [addressType, setAddress] = useState("none");

  let states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];

  const handleStateChange = (event) => {
    setState(event.target.value);
  };
  const handleAddressType = (e) => {
    setAddress(e.target.value);
  };
  return (
    <div>
      <form>
        <div className="row">
          <div className="col-md-6">
            <TextField
              id="firstName"
              label="First Name"
              sx={{
                width: "100%",
                border: "1px solid rgb(167 166 166 / 87%)",
                borderRadius: "8px",
                margin: "6px 0",
              }}
              variant="filled"
              inputProps={{
                style: { backgroundColor: "transparent", border: "none" },
              }}
            />
          </div>
          <div className="col-md-6">
            <TextField
              id="contactNum"
              label="Contact Number"
              sx={{
                width: "100%",
                border: "1px solid rgb(167 166 166 / 87%)",
                borderRadius: "8px",
                margin: "6px 0",
              }}
              variant="filled"
              inputProps={{
                style: { backgroundColor: "transparent", border: "none" },
              }}
            />
          </div>
          <div className="col-sm-12">
            <TextField
              id="address"
              label="Address (Area & Street)"
              sx={{
                width: "100%",
                border: "1px solid rgb(167 166 166 / 87%)",
                borderRadius: "8px",
                margin: "6px 0",
              }}
              variant="filled"
              inputProps={{
                style: { backgroundColor: "transparent", border: "none" },
              }}
            />
          </div>
          <div className="col-md-6">
            <TextField
              id="pincode"
              label="Pincode"
              sx={{
                width: "100%",
                border: "1px solid rgb(167 166 166 / 87%)",
                borderRadius: "8px",
                margin: "6px 0",
              }}
              variant="filled"
              inputProps={{
                style: { backgroundColor: "transparent", border: "none" },
              }}
            />
          </div>
          <div className="col-md-6">
            <TextField
              id="Locality"
              label="Locality"
              sx={{
                width: "100%",
                border: "1px solid rgb(167 166 166 / 87%)",
                borderRadius: "8px",
                margin: "6px 0",
              }}
              variant="filled"
              inputProps={{
                style: { backgroundColor: "transparent", border: "none" },
              }}
            />
          </div>
          <div className="col-md-6">
            <TextField
              id="city"
              label="City/Town/District"
              sx={{
                width: "100%",
                border: "1px solid rgb(167 166 166 / 87%)",
                borderRadius: "8px",
                margin: "6px 0",
              }}
              variant="filled"
              inputProps={{
                style: { backgroundColor: "transparent", border: "none" },
              }}
            />
          </div>
          <div className="col-md-6">
            <FormControl
              variant="filled"
              sx={{
                width: "100%",
                border: "1px solid rgb(167 166 166 / 87%)",
                borderRadius: "8px",
                margin: "6px 0",
              }}
            >
              <InputLabel id="state">State</InputLabel>
              <Select
                labelId="state"
                id="state"
                value={state}
                onChange={handleStateChange}
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                {states.map((each, i) => (
                  <MenuItem value={each}>{each}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-md-6">
            <TextField
              id="landmark"
              label="Landmark (Optional)"
              sx={{
                width: "100%",
                border: "1px solid rgb(167 166 166 / 87%)",
                borderRadius: "8px",
                margin: "6px 0",
              }}
              variant="filled"
              inputProps={{
                style: { backgroundColor: "transparent", border: "none" },
              }}
            />
          </div>
          <div className="col-md-6">
            <FormControl
              variant="filled"
              sx={{
                width: "100%",
                border: "1px solid rgb(167 166 166 / 87%)",
                borderRadius: "8px",
                margin: "6px 0",
              }}
            >
              <InputLabel id="addressType">Address Type</InputLabel>
              <Select
                labelId="addressType"
                id="addressType"
                value={addressType}
                onChange={handleAddressType}
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"home"}>{"Home (All Day Delivery)"}</MenuItem>
                <MenuItem value={"office"}>
                  {"Office (In Office Timings)"}
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col-sm-12">
            <TextField
              id="email"
              label="Email Address (Optional)"
              sx={{
                width: "100%",
                border: "1px solid rgb(167 166 166 / 87%)",
                borderRadius: "8px",
                margin: "6px 0",
              }}
              variant="filled"
              inputProps={{
                style: { backgroundColor: "transparent", border: "none" },
              }}
            />
          </div>
          <div className="col-sm-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
              />
              <label className="form-check-label" for="flexCheckChecked">
                Enroll me with news and offers
              </label>
            </div>
          </div>
          <div className="col-sm-12">
            <button className="bg-success deliverHereBtn">Delivery here</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddShippingAddress;
