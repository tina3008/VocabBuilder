export const CustomStyles = (width) => ({
  control: (provided, state) => ({
    ...provided,
    border: "none",
    boxShadow: "none",
    borderRadius: "14px",
    paddingRight: "8px",
    width: width,
    zIndex: 100,
    height: "48px",
    "&:hover": {
      border: "none",
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "0 8px",
    border: "none",
    backgroundColor: "transparent",
    color: "var(--text-color-main)",
    "&:hover": {
      backgroundColor: "transparent",
      color: "var(--text-color-main)",
      borderRadius: "14px",
    },
  }),

  menu: (provided) => ({
    ...provided,
    borderRadius: "14px",
    border: "2px solid #F8F8F8",
    owerflow: "hidden",
    boxShadow: "none",
    color: "var(--text-color-non-active)",
    "&:hover": {
      borderRadius: "14px",
    },
  }),

  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "var(--text-color-main)",
    padding: "0px",
    "&:hover": {
      color: "var(--text-color-main)",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
});
