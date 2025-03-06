import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [educationData, setEducationData] = useState(); // These are just to hold the JSON data.
  const [experienceData, setExperienceData] = useState(); // Read index.js on server for how it is handled.
  const [overviewData, setOverviewData] = useState();
  const [skillsData, setSkillsData] = useState(); 

  // This is just used for getting all the data on load.
  useEffect(() => {
    getOverview();
    getEducation();
    getExperience();
    getSkills();
  }, [])

  // -- Data Collection --
  // I have previously done experiments on getting the blob data of a json file, read it then convert it
  // the reason being it's less strain on the server if there would be multiple items.
  // I'm certain there is a way I'm missing but for now, fs on the server is handling the data for me.
  // So I am just collecting the data and using it instead.
  const getEducation = async() => {
    try{
      const response = await fetch(`http://localhost:8000/getEdu`);
      const data = await response.json();
      setEducationData(data);
    }
    catch(err_){
      console.log(err_);
    }
  }
  const getExperience = async() => {
    try{
      const response = await fetch(`http://localhost:8000/getExp`);
      const data = await response.json();
      setExperienceData(data);
    }
    catch(err_){
      console.log(err_);
    }
  }
  const getOverview = async() => {
    try{
      const response = await fetch(`http://localhost:8000/getOverview`);
      const data = await response.json();
      setOverviewData(data);
    }
    catch(err_){
      console.log(err_);
    }
  }
  const getSkills = async() => {
    try{
      const response = await fetch(`http://localhost:8000/getSkills`);
      const data = await response.json();
      setSkillsData(data);
    }
    catch(err_){
      console.log(err_);
    }
  }

  // -- Data Objects --
  // Used for placing inside of cards, it's simply just the data formated the way the data is suppose to be handled.
  const OverviewCard = (data) => {
    return(
      <>
        <h2 className="sectionTitle">Overview</h2>
        <dl>
        {
          Object.keys(data).map((keyID) => {
            return (
              <dt key={keyID}>{keyID}: {data[keyID]}</dt>
            )
          })
        }
        </dl>
      </>
    )
  }
  const EducationCard = (data) => {
    return(
      <>
        <h2 className="sectionTitle">Education</h2>
        <dl>
        {
          Object.keys(data).map((mainID) => {
            // Have to use empty ones here, otherwise it gives a compliation error.
            return(
              <>
                <dt key={mainID + "1"}>{data[mainID].Name}</dt>
                <dd key={mainID + "2"}>- {data[mainID].Status}</dd>
              </>
            )
          })
        }
        </dl>
      </>
    )
  }
  const ExperiencesCard = (data) => {
    return(
      <>
        <h2 className='sectionTitle'>Experiences</h2>
        <dl>{data.HeaderText}
          <dt>Self-Taught Experiences:</dt>
          {
            data["Self-Experience"].map((exp, key) => {
              return(
                <dd key={key}>- {exp}</dd>
              )
            })
          }
          <dt>Training Experiences:</dt>
          {
            data.Training.map((exp, key) => {
              return(
                <dd key={key}>- {exp}</dd>
              )
            })
          }
          <dt>Certificates:</dt>
          {
            data.Certificates.map((exp, key) => {
              return(
                <dd key={key}>- {exp}</dd>
              )
            })
          }
        </dl>
      </>
    )
  }
  const SkillsCard = (data) => {
    let headerText = data.HeaderText;
    let skills = data.Skills;
    return (
      <>
        <h2 className="sectionTitle">Skills</h2>
        <dl>{data.HeaderText}
        {
          skills.map((skill, key) => {
            return(
              <dd key={key}>- {skill}</dd>
            )
          })
        }
        </dl>
      </>
    )
  }

  // -- Cards --
  // The large and dual cards accepts either one set of data in one big row or two.
  const LargeCardContainer = (children) => {
    return (
      <div className='largeCard'>
        {children}
      </div>
    )
  }
  const DualCardContainer = (child1, child2) => {
    return (
      <div className="dualCardContainer">
        <div className='dualCard'>
          {child1}
        </div>
        <div className='dualCard'>
          {child2}
        </div>
      </div>
    )
  }

  // These are practically interchangable.
  // I could put these into the containers most likely
  // but that will have to be for another day.
  return (
    <div className='container'>
      <header className="headerContainer">
        <h1 className="title">Resume</h1>
      </header>
      <main className='bodyContainer'>
      { overviewData != null && educationData != null ? // Overview
        (DualCardContainer(OverviewCard(overviewData), EducationCard(educationData))) : 
        (<p>Loading...</p>)
      }
      { experienceData != null ? // Education
        (LargeCardContainer(ExperiencesCard(experienceData))) : 
        (<p>Loading...</p>)
      }
      { skillsData != null ? // Education
        (LargeCardContainer(SkillsCard(skillsData))):
        (<p>Loading...</p>)
      }
      </main>
    </div>
  )
}

export default App
