import React from "react";

export default function List({ data }) {
  return (
    <div className="list-group">
      {data.map((contact) => {
        return (
          <div key={contact.id} className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
              <h4 className="mb-1">Nama: {contact.name}</h4>
            </div>
            <p className="mb-1">No Telp: {contact.telp}</p>
          </div>
        );
      })}
    </div>
  );
}