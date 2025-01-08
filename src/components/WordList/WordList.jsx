import React, { useEffect, useMemo } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import css from "./WordList.module.css";
import ChangeWordModal from "../AddWord/ChangeWordModal";
import { openModal } from "../../redux/modal/slice";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveModal } from "../../redux/modal/selectors";
import { setSelectedWord } from "../../redux/words/slice";
import { selectedWord } from "../../redux/words/selectors";

export default function WordList({ filtrWords }) {
  const dispatch = useDispatch();
  const activeModal = useSelector(selectActiveModal);
  const wordToChange = useSelector(selectedWord);

  const handleModalOpen = (row) => {
    dispatch(openModal("changeModal"));
    dispatch(setSelectedWord(row.original));
    console.log("wordToChange", wordToChange);
    console.log("activeModal", activeModal);
  };
  useEffect(() => {
    console.log("Current activeModal:", activeModal);
    console.log("Current wordToChange:", wordToChange);
  }, [activeModal, wordToChange]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "en",
        header: () => (
          <div className={css.columTitleWord}>
            <h3 className={css.columTitle}>Word</h3>
            <svg className={css.imgLanguage} width="32" height="32">
              <use href="/sprite.svg#icon-united-kingdom" />
            </svg>
          </div>
        ),
      },
      {
        accessorKey: "ua",
        header: () => (
          <div className={css.columTitleWord}>
            <h3 className={css.columTitle}>Translation</h3>
            <svg className={css.imgLanguage}>
              <use href="/sprite.svg#icon-ukraine" />
            </svg>
          </div>
        ),
      },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "progress", header: "Progress" },
      {
        accessorKey: "actions",
        header: "",
        cell: ({ row }) => (
          <button className={css.tableBtn} onClick={() => handleModalOpen(row)}>
            ...
          </button>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => filtrWords, [filtrWords]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!filtrWords || filtrWords.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <>
      <table className={css.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {typeof header.column.columnDef.header === "function"
                    ? header.column.columnDef.header()
                    : header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {cell.column.columnDef.cell
                    ? cell.column.columnDef.cell(cell)
                    : cell.getValue()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {activeModal === "changeModal" && wordToChange && (
        <ChangeWordModal wordToChange={wordToChange} />
      )}
    </>
  );
}


