import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;



export async function getPlans() {
  try {
    const response = await axios({
      url: `${baseUrl}/plan`,
      method: "GET",
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function postPlan(data) {
  try {
    const response = axios.post(`${baseUrl}/plan`, data)
    return response
  } catch (e) {
    console.log(e)
  }
}

export async function deletePlan(id) {
  try {
    let isDeleted = window.confirm(
      `¿Estas seguro de eliminar el plan con el id ${id} ?`
    );
    if (isDeleted) {
      //const response = axios.delete("http://localhost:4000/api/plan/" + id); //TODO use in service
      const response = axios.delete(`${baseUrl}/plan/${id}`)
      return response;
    } else {
      return;
    }
  } catch (e) {
    console.log(e);
  }

}




export async function getPlanById(id) {
  try {
    const response = await axios({
      url: `${baseUrl}/plan/${id}`,
      method: "GET",
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}


export async function postSubject(data, id) {
  try {
    const response = axios.put(`http://localhost:4000/api/plan/add-subject/${id}`, data)
    return response
  } catch (e) {
    console.log(e)
  }

}


export async function addQuarter(id) {
  try {
    const response = axios.put(`http://localhost:4000/api/plan/add-quarter/${id}`)
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function removeQuarter(id) {
  try {
    const response = axios.put(`http://localhost:4000/api/plan/remove-quarter/${id}`)
    return response;
  } catch (e) {
    console.log(e);
  }
}










//TODO hacer de nuevo, eliminar desde arreglo plan
export async function deleteSubject(id) {
  try {
    let isDeleted = window.confirm(`¿Estas seguro de eliminar el registro con el id ${id} ?`)
    if (isDeleted) {
      //const response = axios.delete('http://localhost:4000/api/subjects/' + id)
      const response = ''
      return response
    } else {
      return
    }
  } catch (e) {
    console.log(e)
  }
}



export async function deleteYear(id, year) {
  try {
    let isDeleted = window.confirm(`¿Estas seguro de eliminar el registro con el id ${id} ?`)
    if (isDeleted) {
      const response = axios.delete(`http://localhost:4000/api/plan/remove-quarter/${id}/${year}`)
      return response
    } else {
      return
    }
  } catch (e) {
    console.log(e)
  }
}
