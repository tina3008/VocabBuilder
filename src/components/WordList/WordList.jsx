import React, { useEffect, useMemo, Component } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import css from "./WordList.module.css";
import { openModal } from "../../redux/modal/slice";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveModal } from "../../redux/modal/selectors";
import { selectedWord } from "../../redux/words/selectors";
import AddDeleteModal from "../AddDeleteModal/AddDeleteModal";
import { setSelectedWord } from "../../redux/words/slice";
import { addWordId } from "../../redux/words/operations";
import { Toaster } from "react-hot-toast";
import { showSuccess, showError } from "../ToastComponent/ToastComponent";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function WordList({ filtrWords }) {
  const dispatch = useDispatch();
  const activeModal = useSelector(selectActiveModal);
  const wordToChange = useSelector(selectedWord);
  const choiceWord = useSelector(addWordId);

  const handleModalOpen = (event, row) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const position = {
      top: rect.top + 65,
      left: rect.left - 20,
    };

    const wordToSelect = { ...row.original, position };
    dispatch(setSelectedWord(wordToSelect));
    dispatch(openModal("addDelModal"));
  };

  const handleChoiceWord = (row, actions) => {
    const wordToSelect = { ...row.original };
    dispatch(addWordId(wordToSelect._id))
      .unwrap()
      .then(() => {
        showSuccess({message:"The word has been added"});      

      })
      .catch(() => {
        showError({ message: "Was error, please try again" });      
      });
  };

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

      {
        accessorKey: "category",
        header: () => (
          <h3
            className={
              location.pathname === "/dictionary"
                ? css.dictionaryHeader
                : css.recommendHeader
            }
          >
            Category
          </h3>
        ),
        cell: ({ row }) => (
          <p
            className={
              location.pathname === "/dictionary"
                ? css.dictionaryCategory
                : css.recomendCategory
            }
          >
            {row.original.category}
          </p>
        ),
      },

      ...(location.pathname === "/dictionary"
        ? [
            {
              accessorKey: "progress",
              header: "Progress",
              cell: ({ row }) => (
                <div className={css.progress}>
                  <p className={css.progressTxt}> {row.original.progress}%</p>
                  <div className={css.progressRing}>
                    <CircularProgressbar
                      value={row.original.progress}
                      strokeWidth={15}
                      styles={buildStyles({
                        strokeLinecap: "round",
                        pathTransitionDuration: 0.8,
                        pathColor: `rgba(43, 214, 39, ${
                          row.original.progress / 100
                        })`,
                        trailColor: "#D4F8D3",
                      })}
                    />
                  </div>
                </div>
              ),
            },
          ]
        : []),

      {
        accessorKey: "actions",
        header: "",
        cell: ({ row }) =>
          location.pathname === "/dictionary" ? (
            <button
              className={css.tableBtn}
              onClick={(e) => handleModalOpen(e, row)}
            >
              ...
            </button>
          ) : (
            <button
              className={css.tableBtn}
              onClick={() => handleChoiceWord(row)}
            >
              <div className={css.tableAddBtn}>
                <p className={css.tableBtnTxt}>Add to dictionary</p>
                <svg className={css.imgBtnTxt} width="20" height="20">
                  <use href="/sprite.svg#icon-arrow" />
                </svg>
              </div>
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
  const tableClass =
    location.pathname === "/dictionary" ? css.dictionary : css.recomend;

  return (
    <>
      <table className={`${css.table} ${tableClass}`}>
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
      <Toaster />
      {activeModal === "addDelModal" && wordToChange && (
        <AddDeleteModal wordToChange={wordToChange} />
      )}
    </>
  );
}
