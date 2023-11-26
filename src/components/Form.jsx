/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

const Form = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [btnValue, setBtnValue] = useState('Inscripció');
  const [studentID, setStudentID] = useState('');

  // handle click of cancel button while editing

  const handleClickCancel = (event) => {
    handleInputReset('', '', '');
    setBtnValue('Inscripció');
    event.preventDefault(); // Necessari per evitar que el form es refresqui
  };

  // handle click event of submit/edit button
  const handleClick = (event) => {
    handleInputReset('', '', '');
    if (btnValue === 'Inscripció') {
      props.setPlacesDisponibles(props.placesActuals - 1);
    } else {
      props.setIsRestorePlaces(false);
    }
    // Generació d'un ID per l'estudiant - 4digit
    const randomKey = Math.floor(1000 + Math.random() * 9000);

    // Si estem fent una inscripció, generem un ID nou, sino assignem l'ID de l'estudiant
    const id = btnValue === 'Inscripció' ? randomKey : studentID;
    props.setDetallsEstudiant({
      key: id,
      fname: firstName,
      lname: lastName,
      program: props.tipusEstudiantSelect,
      email: email,
      edit: (
        <MdEdit
          className="text-3xl text-blue-500 hover:text-red-500"
          onClick={() => handleEdit(id, props.tipusEstudiantSelect)}
        />
      ),
      delete: (
        <MdDelete
          className="text-3xl text-blue-500 hover:text-red-500"
          onClick={() => props.handleItemSelection('delete', id)}
        />
      ),
    });
    setBtnValue('Inscripció');
    event.preventDefault(); // Necessari per evitar que el form es refresqui
  };

  // handle input change
  const handleInputChange = (setInput, event) => {
    setInput(event.target.value);
  };

  //set input fields
  const handleInputReset = (firstName, lastName, email) => {
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
  };

  const handleEdit = (studentID, program) => {
    handleInputReset(firstName, lastName, email);
    setStudentID(studentID);
    setBtnValue('Actualitzar');
    props.setSelectedProgram(program);
  };

  return (
    <div className="flex w-3/4 justify-center">
      <form className="enrolForm w-2/3" name="enrolForm">
        <ul className="ulEnrol">
          <li className="mb-2">
            <input
              className="border-1 mb-4 w-full rounded-lg border-dotted border-black bg-gray-200 p-2"
              type="text"
              name="firstname"
              placeholder="Nom"
              value={firstName}
              onChange={(event) => handleInputChange(setFirstName, event)}
            />
          </li>
          <li>
            <input
              className="border-1 mb-4 w-full rounded-lg border-dotted border-black bg-gray-200 p-2"
              type="text"
              name="lastname"
              placeholder="Cognom"
              value={lastName}
              onChange={(event) => handleInputChange(setLastName, event)}
            />
          </li>
          <li>
            <input
              className="border-1 mb-4 w-full rounded-lg border-dotted border-black bg-gray-200 p-2"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(event) => handleInputChange(setEmail, event)}
            />
          </li>
          <li className="flex justify-around">
            <input
              className="mb-4 rounded bg-blue-500 p-2 px-4 py-2 font-bold text-white hover:bg-blue-700"
              type="submit"
              name="Enrol"
              alt="Enrol"
              value={btnValue}
              onClick={handleClick}
            />
            <input
              className="mb-4 rounded bg-blue-500 p-2 px-4 py-2 font-bold text-white hover:bg-blue-700"
              type="submit"
              name="btnCancel"
              alt="Cancel"
              value="Cancel"
              onClick={handleClickCancel}
            />
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Form;
