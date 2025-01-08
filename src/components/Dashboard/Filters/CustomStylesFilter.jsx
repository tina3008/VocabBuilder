export const CustomStyles = (width) => ({
  control: (provided, state) => ({
    ...provided,

    border: "1px solid rgba(18, 20, 23, 0.10)",
    boxShadow: "none",
    borderRadius: "15px",
    paddingRight: "8px",
    width: width,
    // zIndex: 100,
    height: "48px",
    backgroundColor: "transparent",
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
      borderRadius: "15px",
    },
  }),

  menu: (provided) => ({
    ...provided,
    borderRadius: "14px",
    border: "2px solid #F8F8F8",
    owerflow: "hidden",
    boxShadow: "0px 4px 47px 0px rgba(18, 20, 23, 0.08)",

    color: "var(--text-color-main)",
    "&:hover": {
      borderRadius: "15px",
    },
  }),

  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "var(--text-color-main)",
    padding: "0px",
    "&:hover": {
      color: "var(--text-color-main)",
      backgroundColor: "--color_normal",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
});
