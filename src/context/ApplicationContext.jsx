import React, { createContext, useContext, useEffect, useState } from "react";

/*
 Central app data and persistence to localStorage:
 keys: cg_institutions, cg_faculties, cg_courses, cg_applications, cg_companies, cg_jobs
*/

const ApplicationContext = createContext();

export function ApplicationProvider({ children }) {
  const [institutions, setInstitutions] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cg_institutions")) || []; } catch { return []; }
  });

  const [faculties, setFaculties] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cg_faculties")) || []; } catch { return []; }
  });

  const [courses, setCourses] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cg_courses")) || []; } catch { return []; }
  });

  const [applications, setApplications] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cg_applications")) || []; } catch { return []; }
  });

  const [companies, setCompanies] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cg_companies")) || []; } catch { return []; }
  });

  const [jobs, setJobs] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cg_jobs")) || []; } catch { return []; }
  });

  // Persist - Fixed: using consistent localStorage keys
  useEffect(() => { localStorage.setItem("cg_institutions", JSON.stringify(institutions)); }, [institutions]);
  useEffect(() => { localStorage.setItem("cg_faculties", JSON.stringify(faculties)); }, [faculties]);
  useEffect(() => { localStorage.setItem("cg_courses", JSON.stringify(courses)); }, [courses]);
  useEffect(() => { localStorage.setItem("cg_applications", JSON.stringify(applications)); }, [applications]);
  useEffect(() => { localStorage.setItem("cg_companies", JSON.stringify(companies)); }, [companies]);
  useEffect(() => { localStorage.setItem("cg_jobs", JSON.stringify(jobs)); }, [jobs]);

  // Helpers (basic)
  const addInstitution = (inst) => setInstitutions(prev => [...prev, inst]);
  const updateInstitution = (id, updates) => setInstitutions(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
  const deleteInstitution = (id) => setInstitutions(prev => prev.filter(i => i.id !== id));

  const addFaculty = (f) => setFaculties(prev => [...prev, f]);
  const deleteFaculty = (id) => setFaculties(prev => prev.filter(f => f.id !== id));

  const addCourse = (c) => setCourses(prev => [...prev, c]);
  const deleteCourse = (id) => setCourses(prev => prev.filter(c => c.id !== id));

  // ADDED: applyForCourse function for students
  const applyForCourse = (applicationData) => {
    setApplications(prev => [...prev, applicationData]);
  };

  const addApplication = (a) => setApplications(prev => [...prev, a]);
  const updateApplication = (id, updates) => setApplications(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  const deleteApplication = (id) => setApplications(prev => prev.filter(a => a.id !== id));

  const addCompany = (c) => setCompanies(prev => [...prev, c]);
  const updateCompany = (id, updates) => setCompanies(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  const deleteCompany = (id) => setCompanies(prev => prev.filter(c => c.id !== id));

  const addJob = (j) => setJobs(prev => [...prev, j]);
  const updateJob = (id, updates) => setJobs(prev => prev.map(j => j.id === id ? { ...j, ...updates } : j));
  const deleteJob = (id) => setJobs(prev => prev.filter(j => j.id !== id));

  // Admission rule helpers:
  // Ensure student is not admitted into multiple programs across the SAME institution.
  const admitApplication = (id) => {
    const app = applications.find(a => a.id === id);
    if (!app) return;
    // reject other admitted apps for the same student within same institution
    setApplications(prev => prev.map(a => {
      if (a.studentId === app.studentId && a.institutionId === app.institutionId && a.id !== id && a.status === "admitted") {
        // keep them but mark rejected to avoid duplicates
        return { ...a, status: "rejected" };
      }
      return a.id === id ? { ...a, status: "admitted" } : a;
    }));
  };

  // When student picks final institution after multiple admissions:
  const finalizeStudentChoice = (studentId, chosenApplicationId) => {
    setApplications(prev => {
      const chosen = prev.find(a => a.id === chosenApplicationId);
      return prev.map(a => {
        if (a.studentId === studentId) {
          if (a.id === chosenApplicationId) return { ...a, status: "accepted_by_student" };
          // withdraw other admissions/applications
          if (a.status === "admitted" || a.status === "pending") return { ...a, status: "withdrawn" };
        }
        return a;
      });
    });

    // After withdrawing, promote first waiting candidate for any affected course/institution
    // (Promotion logic can be implemented in Institute's view when needed)
  };

  return (
    <ApplicationContext.Provider value={{
      institutions, setInstitutions, addInstitution, updateInstitution, deleteInstitution,
      faculties, setFaculties, addFaculty, deleteFaculty,
      courses, setCourses, addCourse, deleteCourse,
      applications, setApplications, addApplication, updateApplication, deleteApplication,
      companies, setCompanies, addCompany, updateCompany, deleteCompany,
      jobs, setJobs, addJob, updateJob, deleteJob,
      applyForCourse, // ADDED: This was missing
      admitApplication, 
      finalizeStudentChoice
    }}>
      {children}
    </ApplicationContext.Provider>
  );
}

export function useAppData() {
  return useContext(ApplicationContext);
}