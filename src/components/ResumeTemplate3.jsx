import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';

export default function ResumeTemplate3({ formData }) {
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
      filename: 'resume_template3.pdf',
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
	  {name && (<> <h1 style={{ fontSize: '28px', fontWeight: 'bold', textAlign: 'center', color: '#0050a0' }}>{name}</h1> </>)}
	  {email &&(<> <p style={{ textAlign: 'center', fontcolor: '#0050a0' }}>{email} | {phone}</p> </>)}
	  {linked_in &&(<> <p style={{ textAlign: 'center' }}>{linked_in}</p> </>)}
	  {github &&(<> <p style={{ textAlign: 'center' }}>{github}</p> </>)}
	  {website &&(<> <p style={{ textAlign: 'center' }}>{website}</p> </>)}

        {/* Profile Section */}
        {profile && (
          <>
            <h2 style={{ fontWeight: '600', color: '#0050a0' }}>PROFILE</h2>
			<hr/>
            <p>{profile}</p>
          </>
        )}


        {/* Education */}
        {education.some(edu => edu.school || edu.degree || edu.year || edu.marks) && (
		  <div style={{ pageBreakInside: 'avoid' }}>
			<h2 style={{ fontWeight: '600', marginTop: '2px', color: '#0050a0' }}>EDUCATION</h2>
			<hr/>
			{education.map((edu, idx) => (
			  (edu.school || edu.degree || edu.year || edu.marks) && (
				<p key={idx}>
				  {edu.degree} at {edu.school} ({edu.year}) [{edu.marks}]
				</p>
			  )
			))}
		  </div>
		)}

		{/* Experience */}
		{experience.some(exp => exp.company || exp.role || exp.duration || exp.description) && (
		  <div style={{ pageBreakInside: 'avoid' }}>
			<h2 style={{ fontWeight: '600', marginTop: '2px', color: '#0050a0' }}>EXPERIENCE</h2>
			<hr/>
			{experience.map((exp, idx) => (
			  (exp.company || exp.role || exp.duration || exp.description) && (
				<div key={idx} style={{ marginBottom: '2px' }}>
				  <p style={{ fontSize: '20px', fontWeight: '600' }}>
					{exp.role} at {exp.company} ({exp.duration})
				  </p>
				  <ul style={{ listStylePosition: 'inside' }}>
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
		
        {/* Projects */}
		{projects.some(proj => proj.name || proj.description) && (
		  <div style={{ pageBreakInside: 'avoid' }}>
			<h2 style={{ fontWeight: '600', marginTop: '2px', color: '#0050a0' }}>PROJECTS</h2>
			<hr/>
			{projects.map((proj, idx) => (
			  (proj.name || proj.description) && (
				<div key={idx} style={{ marginBottom: '2px' }}>
				  <p style={{ fontSize: '20px', fontWeight: '600'}}>{proj.name}</p>
				  <ul style={{ listStylePosition: 'inside' }}>
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
		
        {/* Skills */}
		{skills && (
          <div style={{ pageBreakInside: 'avoid' }}>
        <h2 style={{ fontWeight: '600', marginTop: '2px', color: '#0050a0' }}>SKILLS</h2>
		<hr/>
        <p>{skills}</p>
		</div>
		)}
		
        {/* Languages */}
        {languages && (
          <div style={{ pageBreakInside: 'avoid' }}>
            <h2 style={{ fontWeight: '600', marginTop: '2px', color: '#0050a0' }}>LANGUAGES</h2>
			<hr/>
            <p>{languages}</p>
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
