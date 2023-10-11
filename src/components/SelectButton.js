import { styled } from "@mui/material";

const SelectButton = ({ children, selected, onClick }) => {
  const SelectedBtn = styled("span")(({ theme }) => ({
    border: "1px solid gold",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: selected ? "gold" : "",
    color: selected ? "black" : "",
    fontWeight: selected ? 700 : 500,
    "&:hover": {
      backgroundColor: "gold",
      color: "black",
    },
    width: "22%",
    //   margin: 5,
  }));

  return <SelectedBtn onClick={onClick}>{children}</SelectedBtn>;
};

export default SelectButton;
