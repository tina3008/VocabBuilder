export const CustomStylesAddWord = (width) => ({
  control: (provided, state) => ({
    ...provided,

    border: " 1px solid rgba(252, 252, 252, 0.30)",
    boxShadow: "none",
    borderRadius: "15px",
    paddingRight: "8px",
    width: width,
    height: "48px",

    backgroundColor: "transparent",
    "&:hover": {
      border: " 1px solid rgba(252, 252, 252, 0.30)",
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "0 8px",
    border: "none",
    backgroundColor: "transparent",
    color: "var(--white)",
    "&:hover": {
      backgroundColor: "transparent",
      color: "var(--white)",
      borderRadius: "15px",
    },
  }),

  menu: (provided) => ({
    ...provided,
    borderRadius: "15px",
    border: "2px solid #F8F8F8",
    owerflow: "hidden",
    boxShadow: "0px 4px 47px 0px rgba(18, 20, 23, 0.08)",

    color: "rgba(18, 20, 23, 0.50);",
    "&:hover": {
      borderRadius: "15px",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "var(--color_hover)" : "transparent",
    color: state.isSelected ? "var(--white)" : "rgba(18, 20, 23, 0.50)",
    padding: 10,
    "&:hover": {
      backgroundColor: "var(--backgroundForm)",
    },
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "var(--white)",
    padding: "0px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "var(--white)",
  }),
});
