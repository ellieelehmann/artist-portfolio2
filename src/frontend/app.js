

//subpages views
document.addEventListener('DOMContentLoaded', () => {
    const views = document.querySelectorAll(".view")
    
    
    function navigate(viewId) {
        
          // Hide all viewss
          views.forEach(view => {
            view.style.display = "none";
          });
          // show the requested view
          document.getElementById(viewId).style.display = "block";
        // storing the current view in local stroage 
          localStorage.setItem('currentView', viewId);
        }
        function displayView() { // a function to check to see if view was displayed if not display it 
            const storedView = localStorage.getItem('currentView');
            if (storedView) {
                navigate(storedView);
            } else {
                navigate('homeView');
            }
        }


        // event listeners for each subpage link 
    const subpages = document.querySelectorAll('.subpages a');
    subpages.forEach(subpage => {
    subpage.addEventListener('click', function(event) {
        event.preventDefault(); // when user clicks on <a> anchor element pervents the defult will not reload the enitre page _> navigates to specific href link 
        const viewId = this.getAttribute('href').substring(1); 
        navigate(viewId);
        });
    });
// home button 
    const homeButton = document.querySelectorAll('.home');
    homeButton.forEach(button => {
      button.addEventListener('click', function(event) {
          event.preventDefault();
          navigate('homeView');
      });
  });

 
    //event listener for clicking on the grid items

    const griditems = document.querySelectorAll('.grid-item');
    griditems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const artworkImage = this.querySelector('img').src;
            const artworkDescription = this.querySelector('.hidden-des').textContent; // hidden attributwe from html access
            const artworkTitle = this.querySelector('h2').textContent;
            let  contentSrc = '';
            

           
         
            localStorage.setItem('selectedArtwork', JSON.stringify({
                    title: artworkTitle,
                    image: artworkImage,
                    description: artworkDescription,
                    src: contentSrc
            }));
            navigate('artworkView'); 
            displayArtView();

        });

    });




// idea view 
// handels submitting the form 

async function createIdea(){
    // sends post request to server to create a new idea
    const userName = document.getElementById('input-name'); 
    const ideaName = document.getElementById('input-idea');
    const userNamevalue = userName.value;
    const ideaNamevalue = ideaName.value;

    try{
    const ideaContainer = document.getElementById("ideas");
    const response = await fetch (`http://localhost:3000/create?_id=${userNamevalue}}`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({_id:userNamevalue,idea:ideaNamevalue})
    }); 
    const data = await response.json(); 
    ideaContainer.innerHTML = data; 

} catch(err){
    console.error('Error submitting idea:', err);
    }
}

async function displayIdeas(){
    // sends get request to server to read all the submited ideas
    const ideaContainer = document.getElementById("ideas");
    try{
        const response = await fetch('http://localhost:3000/all',{
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const allIdeas = response.json();
        ideaContainer.innerHTML = allIdeas; 

    } catch(err){
        console.log('Error displaying ideas',err);
    }



}

async function editIdea(){
    // sends put request to server to update the idea that is clicked on
    const ideaContainer = document.getElementById("ideas");
    const userName = document.getElementById('input-name'); 
    const ideaName = document.getElementById('input-idea');
    const userNamevalue = userName.value;
    const ideaNamevalue = ideaName.value;
    try{
    if (!userNamevalue) {
        alert("Your name is required to update idea!");
        return;
      }
      const response = await fetch(`http://localhost:3000/update?_id=${userNamevalue}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({idea: ideaNamevalue})

      });
      const data = await response.json();
    
      ideaContainer.innerHTML = data;
    }catch(err){
        console.log('Error deleting idea',err);
    }

}

async function deleteIdea(){
    // sends a delete request to server to delete the idea that was clicked upon 
    const ideaContainer = document.getElementById("ideas");
    const userName = document.getElementById('input-name'); 
    const ideaName = document.getElementById('input-idea');
    const userNamevalue = userName.value;
    const ideaNamevalue = ideaName.value;
    try{
    if (!userNamevalue) {
        alert("Idea name is required to delete!");
        return;
      }
    
      const response = await fetch(`http://localhost:3000/delete?_id=${userNamevalue}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      ideaContainer.innerHTML = data;
    } catch(err){
        console.log('Error deleting idea',err);

    }

}


const create = document.getElementById('create');
create.addEventListener('click', createIdea);

const display = document.getElementById('display');
display.addEventListener('click',displayIdeas); 

const edit = document.getElementById('edit');
edit.addEventListener('click',editIdea); 

const deletebtn = document.getElementById('delete');
deletebtn.addEventListener('click',deleteIdea); 


//store in local storage so that in artwork details I can load it from local storage
    

    
    function displayArtView(){
        const storeArtwork = localStorage.getItem('selectedArtwork');
        if (storeArtwork) {
            const artwork = JSON.parse(storeArtwork);
            const expandedArtwork = document.getElementById('expandedArtwork');
            const artworkTitleValue = document.getElementById('artworkTitle');
            const artworkDescriptionValue = document.getElementById('artworkDescription'); // retrieve

            expandedArtwork.src = artwork.image;
                expandedArtwork.style.display = 'block';

            artworkTitleValue.textContent= artwork.title;
            artworkDescriptionValue.textContent = artwork.description;
        }
    }




     // get home button again because new view?
      // Initialize with the home view
    displayView(); 
 


    document.getElementById('artworkView').addEventListener('click', function() {
        displayArtView();
    });

 


});



