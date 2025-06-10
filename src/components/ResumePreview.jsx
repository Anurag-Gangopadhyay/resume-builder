import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';

export default function ResumePreview({ formData }) {
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
      filename: 'resume.pdf',
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
			minHeight: '1123px',   // A4 height at 96dpi
			border: '1px solid #ccc',
			padding: '16px',
			backgroundColor: '#fff',
			boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
			marginBottom: '6px',
			overflow: 'hidden',
			margin: 'auto' // center the resume
		  }}
      >
	  {name && (<> <h1 style={{ fontSize: '26px', fontWeight: 'bold', textAlign: 'center' }}>{name}</h1> </>)}
	  {email &&(<> <p style={{ textAlign: 'center' }}>{email} | {phone}</p> </>)}
	  {linked_in &&(<> <p style={{ textAlign: 'center' }}>{linked_in}</p> </>)}
	  {github &&(<> <p style={{ textAlign: 'center' }}>{github}</p> </>)}
	  {website &&(<> <p style={{ textAlign: 'center' }}>{website}</p> </>)}
	  {profile && (<> <hr style={{ margin: '1px 0' }} /> </>)}

        {/* Profile Section */}
        {profile && (
          <>
            <h2 style={{ fontWeight: '600', marginTop: '2px', textAlign: 'center' }}>PROFILE</h2>
            <p style={{ textAlign: 'center' }}>{profile}</p>
          </>
        )}
	  {education.some(edu => edu.school || edu.degree || edu.year || edu.marks) && (<> <hr style={{ margin: '1px 0' }} /> </>)}


        {/* Education */}
        {education.some(edu => edu.school || edu.degree || edu.year || edu.marks) && (
		  <div style={{ pageBreakInside: 'avoid' }}>
			<h2 style={{ fontWeight: '600', marginTop: '2px', textAlign: 'center' }}>EDUCATION</h2>
			{education.map((edu, idx) => (
			  (edu.school || edu.degree || edu.year || edu.marks) && (
				<p key={idx} style={{ textAlign: 'center' }}>
				  {edu.degree} at {edu.school} ({edu.year}) [{edu.marks}]
				</p>
			  )
			))}
		  </div>
		)}

	  {experience.some(exp => exp.company || exp.role || exp.duration || exp.description) && (<> <hr style={{ margin: '1px 0' }} /> </>)}

		{/* Experience */}
		{experience.some(exp => exp.company || exp.role || exp.duration || exp.description) && (
		  <div style={{ pageBreakInside: 'avoid' }}>
			<h2 style={{ fontWeight: '600', marginTop: '2px', textAlign: 'center' }}>EXPERIENCE</h2>
			{experience.map((exp, idx) => (
			  (exp.company || exp.role || exp.duration || exp.description) && (
				<div key={idx} style={{ marginBottom: '2px' }}>
				  <p style={{ fontSize: '20px', fontWeight: '600', textAlign: 'center' }}>
					{exp.role} at {exp.company} ({exp.duration})
				  </p>
				  <ul style={{ textAlign: 'center', paddingLeft: '4px', listStylePosition: 'inside' }}>
					{(exp.description ||'')
					  .split('\n')
					  .filter(line => line.trim() !== '')
					  .map((line, pIdx) => (
						<li key={pIdx} style={{ marginBottom: '1px' }}>{line.trim()}</li>
					  ))}
				  </ul>
				</div>
			  )
			))}
		  </div>
		)}


	  {projects.some(proj => proj.name || proj.description) && (<> <hr style={{ margin: '1px 0' }} /> </>)}

        {/* Projects */}
		{projects.some(proj => proj.name || proj.description) && (
		  <div style={{ pageBreakInside: 'avoid' }}>
			<h2 style={{ fontWeight: '600', marginTop: '2px', textAlign: 'center' }}>PROJECTS</h2>
			{projects.map((proj, idx) => (
			  (proj.name || proj.description) && (
				<div key={idx} style={{ marginBottom: '2px' }}>
				  <p style={{ fontSize: '20px', fontWeight: '600', textAlign: 'center' }}>{proj.name}</p>
				  <ul style={{ textAlign: 'center', paddingLeft: '4px', listStylePosition: 'inside' }}>
					{(proj.description || '')
					  .split('\n')
					  .filter(line => line.trim() !== '')
					  .map((line, pIdx) => (
						<li key={pIdx} style={{ marginBottom: '1px' }}>{line.trim()}</li>
					  ))}
				  </ul>
				</div>
			  )
			))}
		  </div>
		)}

	  {skills && (<> <hr style={{ margin: '1px 0' }} /> </>)}

        {/* Skills */}
		{skills && (
          <div style={{ pageBreakInside: 'avoid' }}>
        <h2 style={{ fontWeight: '600', marginTop: '2px', textAlign: 'center' }}>SKILLS</h2>
        <p style={{ textAlign: 'center' }}>{skills}</p>
		</div>
		)}
		
	  {languages && (<> <hr style={{ margin: '1px 0' }} /> </>)}

        {/* Languages */}
        {languages && (
          <div style={{ pageBreakInside: 'avoid' }}>
            <h2 style={{ fontWeight: '600', marginTop: '2px', textAlign: 'center' }}>LANGUAGES</h2>
            <p style={{ textAlign: 'center' }}>{languages}</p>
          </div>
        )}
      </div>

      <button
        onClick={downloadPDF}
        style={{
          backgroundColor: '#28a745',
          color: 'white',
          padding: '10px 16px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Download as PDF
      </button>
    </div>
  );
}
