import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';

export default function ResumeTemplate2({ formData }) {
  const {
    name,
    email,
    phone,
	linked_in,
	github,
	website,
    education,
    experience,
    skills,
    projects,
    profile,
    languages
  } = formData;

  const resumeRef = useRef();

  const downloadPDF = () => {
    const opt = {
      margin: 0,
      filename: 'resume_template2.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(resumeRef.current).save();
  };

  return (
    <div>
      <div
        ref={resumeRef}
        style={{
		  width: '794px',        // A4 width at 96dpi
		  minHeight: '1123px', 
          fontFamily: 'Arial, sans-serif',
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          backgroundColor: '#f4f4f4',
          color: '#333',
          padding: '20px',
          gap: '20px',
          border: '1px solid #ccc',
		  margin: 'auto' // center the resume
        }}
      >
        {/* Sidebar */}
        <div style={{ backgroundColor: '#2c3e50', color: '#ecf0f1', padding: '20px', borderRadius: '6px' }}>
          {name && <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>{name}</h1>}
          {email && <p>{email}</p>}
          {phone && <p>{phone}</p>}
		  {linked_in && <p>{linked_in}</p>}
		  {github && <p>{github}</p>}
		  {website && <p>{website}</p>}
          {skills && (
            <>
              <h3 style={{ borderBottom: '1px solid #ecf0f1', paddingBottom: '4px', marginTop: '20px' }}>Skills</h3>
              <p>{skills}</p>
            </>
          )}

          {languages && (
            <>
              <h3 style={{ borderBottom: '1px solid #ecf0f1', paddingBottom: '4px', marginTop: '20px' }}>Languages</h3>
              <p>{languages}</p>
            </>
          )}
        </div>

        {/* Main Content */}
        <div>
          {profile && (
            <div style={{ pageBreakInside: 'avoid' }}>
              <h2 style={{ borderBottom: '2px solid #2980b9' }}>Profile</h2>
              <p>{profile}</p>
            </div>
          )}

          {education.some(edu => edu.school || edu.degree || edu.year || edu.marks) && (
            <div style={{ pageBreakInside: 'avoid' }}>
              <h2 style={{ borderBottom: '2px solid #2980b9' }}>Education</h2>
              {education.map((edu, idx) => (
                (edu.school || edu.degree || edu.year || edu.marks) && (
                  <p key={idx}>
                    {edu.degree} at {edu.school} ({edu.year}) - {edu.marks}
                  </p>
                )
              ))}
            </div>
          )}

          {experience.some(exp => exp.company || exp.role || exp.duration || exp.description) && (
            <div style={{ pageBreakInside: 'avoid' }}>
              <h2 style={{ borderBottom: '2px solid #2980b9' }}>Experience</h2>
              {experience.map((exp, idx) => (
                (exp.company || exp.role || exp.duration || exp.description) && (
                  <div key={idx} style={{ marginBottom: '8px' }}>
                    <strong>{exp.role}</strong> at {exp.company} ({exp.duration})
                    <ul style={{ paddingLeft: '20px', listStyle: 'square' }}>
                      {(exp.description || '')
                        .split('\n')
                        .filter(line => line.trim() !== '')
                        .map((line, pIdx) => (
                          <li key={pIdx}>{line.trim()}</li>
                        ))}
                    </ul>
                  </div>
                )
              ))}
            </div>
          )}

          {projects.some(proj => proj.name || proj.description) && (
            <div style={{ pageBreakInside: 'avoid' }}>
              <h2 style={{ borderBottom: '2px solid #2980b9' }}>Projects</h2>
              {projects.map((proj, idx) => (
                (proj.name || proj.description) && (
                  <div key={idx} style={{ marginBottom: '8px' }}>
                    <strong>{proj.name}</strong>
                    <ul style={{ paddingLeft: '20px', listStyle: 'square' }}>
                      {(proj.description || '')
                        .split('\n')
                        .filter(line => line.trim() !== '')
                        .map((line, pIdx) => (
                          <li key={pIdx}>{line.trim()}</li>
                        ))}
                    </ul>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={downloadPDF}
        style={{
          backgroundColor: '#3498db',
          color: 'white',
          padding: '10px 16px',
          border: 'none',
          borderRadius: '4px',
          marginTop: '10px',
          cursor: 'pointer'
        }}
      >
        Download as PDF
      </button>
    </div>
  );
}
