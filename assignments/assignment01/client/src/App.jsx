import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [educationData, setEducationData] = useState();
  const [experienceData, setExperienceData] = useState();
  const [overviewData, setOverviewData] = useState();
  const [skillsData, setSkillsData] = useState();

  useEffect(() => {
    getOverview();
    getEducation();
    getExperience();
    getSkills();
  }, [])

  // Had to experiment and research a little more about the blob but here we are.
  // I can obtain a blob and turn it into a JSON format using FileReader.
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

  // -- CONCEPT
  const overviewContainer = (data) => {
    return (
      <div className='overviewCard'>
        <h2 className="sectionTitle">Overview</h2>
        <dl>
        {
          Object.keys(data).map((keyID) => {
            return (
              <p key={keyID}>{keyID}: {data[keyID]}</p>
            )
          })
        }
        </dl>
      </div>
    )
  }
  const dualContainer = (items1, items2) => {
    return (
      <div className="dualCardContainer">
        <div className='dualCard'>
          <h2 className="sectionTitle">Education</h2>
          {
            Object.keys(items1).map((mainID) => {
              // Have to use empty ones here, otherwise it gives a compliation error.
              return(
                <>
                  <dt>{items1[mainID].Name}</dt>
                  <dd>Status: {items1[mainID].Status}</dd>
                </>
              )
            })
          }
        </div>
        <div className='dualCard'>
          <h2 className='sectionTitle'>Experiences</h2>
          <dl>{items2.HeaderText}
            <dt>Self-Taught Experiences:</dt>
            {
              items2.Self.map((exp, key) => {
                return(
                  <dd key={key}>- {exp}</dd>
                )
              })
            }
            <dt>Training Experiences:</dt>
            {
              items2.Training.map((exp, key) => {
                return(
                  <dd key={key}>- {exp}</dd>
                )
              })
            }
            <dt>Certificates:</dt>
            {
              items2.Certificates.map((exp, key) => {
                return(
                  <dd key={key}>- {exp}</dd>
                )
              })
            }
          </dl>
        </div>
      </div>
    )
  }
  const skillsContainer = (items) => {
    let headerText = items.HeaderText;
    let skills = items.Skills;
    return (
      <div className='skillsCard'>
        <h2 className="sectionTitle">Skills</h2>
        <dl>{items.HeaderText}
        {
          skills.map((skill, key) => {
            return(
              <dd key={key}>- {skill}</dd>
            )
          })
        }
        </dl>
      </div>
    )
  }

  return (
    <div className='container'>
      <header className="headerContainer">
        <h1 className="title">Resume</h1>
      </header>
      <main className='bodyContainer'>
      { overviewData != null ? // Overview
        (overviewContainer(overviewData)) : 
        (<p>Loading...</p>)
      }
      { educationData != null && experienceData != null ? // Education
        (dualContainer(educationData, experienceData)) : 
        (<p>Loading...</p>)
      }
      { skillsData != null ? // Education
        (skillsContainer(skillsData)):
        (<p>Loading...</p>)
      }
      </main>
    </div>
  )
}

export default App
