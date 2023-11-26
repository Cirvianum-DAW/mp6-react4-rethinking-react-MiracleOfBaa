import React, { useState, useEffect } from 'react';

const StudentList = (props) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    // Lògica per borrar estudiants
    if (props.action === 'delete') {
      // filtrem l'array d'estudiants per eliminar l'estudiant seleccionat
      const newItems = items.filter((item) => {
        console.log(item.key, props.selectedItemId);
        if (item.key === props.selectedItemId) {
          // restaurem les places disponisbles (+1)
          props.restaurarPlaces(item.program);
          return false;
        } else {
          return true;
        }
      });
      setItems(newItems);
    }

    // Lògiga per afegir o editar estudiants
    const isItemKey = props.detallsEstudiant.key;
    if (isItemKey) {
      // Comprovem si l'estudiant ja existeix a la llista
      const i = items.findIndex((item) => item.key === isItemKey);
      if (i > -1) {
        // Si l'estudiant ja existeix, actualitzem les dades. Hem d'evitar mutar l'array original
        const newItems = [...items];
        newItems[i] = props.detallsEstudiant;
        setItems(newItems);
      } else {
        setItems((prevItems) => [...prevItems, props.detallsEstudiant]);
      }
    }
    // Executem la funció de borrar estudiant per l'ID seleccionat
  }, [props.detallsEstudiant, props.action]);

  // Per assegurar que es renderitza correctament la llista d'estudiants
  // Afegim aquest useEffect cada cop que es modifiqui l'array d'estudiants "items["
  // Com que això només passa quan es fa un delete o un edit,
  // tornem a posar a zero els detalls de l'estudiant i l'acció
  useEffect(() => {
    props.setDetallsEstudiant({});
    props.setAction('');
  }, [items]);

  return (
    <table className="m-3 table-auto rounded-lg">
      <thead className="bg-blue-500 p-2 px-4 py-2 font-bold text-white">
        <tr>
          <th className="rounded-l-lg px-4 py-2">Editar</th>
          <th className="px-4 py-2">Nom</th>
          <th className="px-4 py-2">Cognoms</th>
          <th className="px-4 py-2">Estudis</th>
          <th className="px-4 py-2">Correu</th>
          <th className="rounded-r-lg px-4 py-2">Borrar</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          return (
            <tr key={item.key}>
              <td className="border px-4 py-2">{item.edit}</td>
              <td className="border px-4 py-2">{item.fname}</td>
              <td className="border px-4 py-2">{item.lname}</td>
              <td className="border px-4 py-2">{item.program}</td>
              <td className="border px-4 py-2">{item.email}</td>
              <td className="border px-4 py-2">{item.delete}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default StudentList;
