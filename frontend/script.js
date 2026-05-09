const API = "http://localhost:5000/leads";

const leadForm = document.getElementById("leadForm");

const leadList = document.getElementById("leadList");


// Fetch Leads

async function fetchLeads(){

    const response = await fetch(API);

    const leads = await response.json();

    leadList.innerHTML = "";

    leads.forEach((lead)=>{

        leadList.innerHTML += `

        <div class="lead">

            <h3>${lead.name}</h3>

            <p>Email: ${lead.email}</p>

            <p>Source: ${lead.source}</p>

            <p>Notes: ${lead.notes}</p>

            <button onclick="deleteLead('${lead._id}')">

                Delete

            </button>

        </div>

        `;

    });

}


// Add Lead

leadForm.addEventListener("submit", async(e)=>{

    e.preventDefault();

    const lead = {

        name:name.value,

        email:email.value,

        source:source.value,

        notes:notes.value

    };

    await fetch(API,{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify(lead)

    });

    leadForm.reset();

    fetchLeads();

});


// Delete Lead

async function deleteLead(id){

    await fetch(`${API}/${id}`,{

        method:"DELETE"

    });

    fetchLeads();

}


fetchLeads();