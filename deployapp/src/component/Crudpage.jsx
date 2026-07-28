import { useEffect, useState } from "react";
import axios from "axios";
import "./crud.css";
import { Apiurl } from "./url";

// const API_URL = "http://localhost:5000/users";

function CrudData() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get(`${Apiurl}/getcrud`);
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    console.log(name,email,"mammss")
    try {
      if (!name || !email) {
        alert("Enter Name and Email");
        return;
      }

      if (editId) {
        await axios.put(`${Apiurl}/updatecruddata/${editId}`, {
          name,
          email,
        });
      } else {
        await axios.post(`${Apiurl}/adding_data`, {
          name,
          email,
        });
      }

      setName("");
      setEmail("");
      setEditId(null);

      getUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (row) => {
    setEditId(row.id);
    setName(row.name);
    setEmail(row.email);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${Apiurl}/deleteDutylabel/${id}`);
      getUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="crud-container">
      <h2>User CRUD</h2>

      <div className="form-section">
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer-Name11</th>
            <th>Emailid</th>
            <th>Created-Time</th>
            <th>Edit</th>
            <th>Deletee</th>
          </tr>
        </thead>

        <tbody>
          {users.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.created_at}</td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(row)}
                >
                  Edit
                </button>
              </td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CrudData;