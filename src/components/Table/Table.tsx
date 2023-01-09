import React from "react";
import clsx from "clsx";
import "./Table.css";
import NotFound from "../NotFound/NotFound";

export interface ITableHeader {
  key: string;
  text: React.ReactNode;
  render?: (any: any) => React.ReactNode;
  width?: string;
  align?: string;
}

export interface ITable {
  headers: ITableHeader[];
  items: Array<any>;
  footer?: any;
  className?: string;
  loading?: boolean;
  theadClassName?: string;
  rowClassName?: string;
  isSelectedRow?: (item: any) => any;
  onClick?: (item: any) => void;
}

const TableNotFound = React.memo(() => {
  return (
    <div>
      <NotFound />
    </div>
  );
});
TableNotFound.displayName = "TableNotFound";

const TableLoading = ({ colSpan }: { colSpan: number }) => {
  return (
    <tr>
      <td colSpan={colSpan} className="py-5 px-8 text-center">
        Yükleniyor
      </td>
    </tr>
  );
};

const Table = ({ headers = [], items = [], className = "", loading = false, theadClassName, isSelectedRow, rowClassName, onClick, ...props }: ITable) => {
  const _getHeaders = headers.map((header) => (
    <div className={clsx("th text-headline-01")} style={{ maxWidth: header.width, minWidth: header.width, justifyContent: header.align }} key={`th_${header.key.toString()}`}>
      {header.text}
    </div>
  ));
  const _getItems = items.map((item, k) => (
    <>
      {item.beforeRow ? (
        <div className="tr" key={`beforeRow_${k.toString()}`}>
          <td colSpan={headers.length} className="py-5 px-8 text-left">
            {item.beforeRow}
          </td>
        </div>
      ) : (
        <></>
      )}
      <div
        className={clsx("tr", rowClassName, isSelectedRow && isSelectedRow(item) ? "active" : "")}
        key={`row_${k.toString()}`}
        onClick={() => {
          if (onClick) {
            onClick(item);
          }
        }}
      >
        {headers.map((header) => (
          <div className="td" style={{ maxWidth: header.width, minWidth: header.width, justifyContent: header.align }} key={`td_${header.key}`}>
            {header.render ? header.render(item) : <div className="cell text-h6">{item[header.key]}</div>}
          </div>
        ))}
      </div>
      {item.afterRow ? (
        <div key={`afterRow_${k.toString()}`} className={"tr"}>
          <td colSpan={headers.length} className="py-5 px-8 text-left">
            {item.afterRow}
          </td>
        </div>
      ) : (
        <></>
      )}
    </>
  ));

  return (
    <div>
      <div className={clsx("table", className)} {...props}>
        <div data-testid="tableHeader" className={clsx("thead", theadClassName)}>
          <div className="container-fluid">
            <div className="tr">{_getHeaders}</div>
          </div>
        </div>
        <div data-testid="tableBody" className={"tbody container-fluid"}>
          {loading ? <TableLoading colSpan={headers.length} /> : items.length ? _getItems : <TableNotFound />}
        </div>
        <div className="container-fluid">{props.footer && <div className={clsx("tfoot")}>{props.footer}</div>}</div>
      </div>
    </div>
  );
};

export default React.memo(Table);
