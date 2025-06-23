
const { useState, useEffect, useRef } = React;

function TemplateSelector({ selected, setSelected }) {
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <button  className = "button" onClick={() => setSelected('template1')}
        style={{ backgroundColor: selected === 'template1' ? '#007bff' : '#ccc' }}>
        Template 1
      </button>
      <button  className = "button" onClick={() => setSelected('template2')}
        style={{ backgroundColor: selected === 'template2' ? '#007bff' : '#ccc' }}>
        Template 2
      </button>
    </div>
  );
}

function FormSection({ formData, setFormData }) {
  useEffect(() => {
    const savedData = localStorage.getItem('resumeDraft');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (index, key, value, section) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][key] = value;
    setFormData({ ...formData, [section]: updatedSection });
  };

  const addField = (section, template) => {
    setFormData({ ...formData, [section]: [...formData[section], template] });
  };
  
  const deleteField = (section, index) => {
	  const updatedSection = [...formData[section]];
	  updatedSection.splice(index, 1);
	  setFormData({ ...formData, [section]: updatedSection });
	};


  const inputStyle = {
    width: '100%', padding: '8px', margin: '4px 0', borderRadius: '4px', border: '1px solid #ccc'
  };

  return (
    <div style={{ maxWidth: '600px', padding: '10px' }}>
      <h2>Resume Builder</h2>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" style={inputStyle} />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" style={inputStyle} />
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" style={inputStyle} />
      <textarea name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills (comma-separated)" style={inputStyle} />
      <textarea name="profile" value={formData.profile} onChange={handleChange} placeholder="Profile Summary" style={inputStyle} />
      <input name="languages" value={formData.languages} onChange={handleChange} placeholder="Languages" style={inputStyle} />

      <h3>Education</h3>
      {formData.education.map((edu, idx) => (
        <div key={idx}>
          <input value={edu.school} onChange={e => handleArrayChange(idx, 'school', e.target.value, 'education')} placeholder="School" style={inputStyle} />
          <input value={edu.degree} onChange={e => handleArrayChange(idx, 'degree', e.target.value, 'education')} placeholder="Degree" style={inputStyle} />
          <input value={edu.year} onChange={e => handleArrayChange(idx, 'year', e.target.value, 'education')} placeholder="Year" style={inputStyle} />
          <input value={edu.marks} onChange={e => handleArrayChange(idx, 'marks', e.target.value, 'education')} placeholder="Marks (e.g. 86%)" style={inputStyle} />
          <button className = "button" onClick={() => deleteField('education', idx)}>Delete</button>

		</div>
      ))}
      <button className = "button" onClick={() => addField('education', { school: '', degree: '', year: '', marks: '' })}>+ Add Education</button>

      <h3>Experience</h3>
      {formData.experience.map((exp, idx) => (
        <div key={idx}>
          <input value={exp.company} onChange={e => handleArrayChange(idx, 'company', e.target.value, 'experience')} placeholder="Company" style={inputStyle} />
          <input value={exp.role} onChange={e => handleArrayChange(idx, 'role', e.target.value, 'experience')} placeholder="Role" style={inputStyle} />
          <input value={exp.duration} onChange={e => handleArrayChange(idx, 'duration', e.target.value, 'experience')} placeholder="Duration" style={inputStyle} />
          <textarea value={exp.description} onChange={e => handleArrayChange(idx, 'description', e.target.value, 'experience')} placeholder="Description (enter for bullets)" style={inputStyle} />
		  <button className = "button"  onClick={() => deleteField('experience', idx)}>Delete</button>
		</div>
      ))}
      <button  className = "button" onClick={() => addField('experience', { company: '', role: '', duration: '', description: '' })}>+ Add Experience</button>

      <h3>Projects</h3>
      {formData.projects.map((proj, idx) => (
        <div key={idx}>
          <input value={proj.name} onChange={e => handleArrayChange(idx, 'name', e.target.value, 'projects')} placeholder="Project Name" style={inputStyle} />
          <textarea value={proj.description} onChange={e => handleArrayChange(idx, 'description', e.target.value, 'projects')} placeholder="Description (enter for bullets)" style={inputStyle} />
          <button  className = "button" onClick={() => deleteField('projects', idx)}>Delete</button>
		</div>
      ))}
      <button  className = "button" onClick={() => addField('projects', { name: '', description: '' })}>+ Add Project</button>

      <br />
	  <br/>
      <button  className = "button" onClick={() => localStorage.setItem('resumeDraft', JSON.stringify(formData))}>Save Draft</button>
      <button  className = "button" onClick={() => {
        localStorage.removeItem('resumeDraft');
        setFormData({
          name: '', email: '', phone: '', profile: '', education: [{ degree: '', school: '', year: '', marks: '' }],
          experience: [{ role: '', company: '', duration: '', description: '' }],
          projects: [{ name: '', description: '' }], skills: '', languages: ''
        });
      }}>Clear Draft</button>
    </div>
  );
}

function DownloadButton({ targetRef }) {
  const downloadPDF = () => {
    const opt = {
      margin: 0,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(targetRef.current).save();
  };

  return (
    <button  className = "button" onClick={downloadPDF} style={{ marginTop: '10px', padding: '10px', backgroundColor: '#28a745', color: '#fff' }}>
      Download as PDF
    </button>
  );
}

function ResumeTemplate1({ formData }) {
  const ref = useRef();
  const { name, email, phone, education, experience, skills, projects, profile, languages } = formData;

  return (
    <div style={{ padding: '10px' }}>
      <div ref={ref} className="a4-page">
        <h1 style={{ textAlign: 'center' }}>{name}</h1>
		{email &&<><p style={{ textAlign: 'center' }}>{email} | {phone}</p></>}
        {profile && <><h3>Profile</h3><p>{profile}</p></>}
        {education.some(e => e.school || e.degree || e.year || e.marks)&& (<><h3>Education</h3>{education.map((e, i) => <p key={i}>{e.degree} at {e.school} ({e.year}) [{e.marks}]</p>)}</>)}
        {experience.some(e => e.role || e.company || e.duration || e.description) && (<><h3>Experience</h3>{experience.map((e, i) => <div key={i}><b>{e.role}</b> at {e.company} ({e.duration})<ul>{(e.description || '').split('\n').map((line, j) => <li key={j}>{line}</li>)}</ul></div>)}</>)}
        {projects.some(p => p.name || p.description) && (<><h3>Projects</h3>{projects.map((p, i) => <div key={i}><b>{p.name}</b><ul>{(p.description || '').split('\n').map((line, j) => <li key={j}>{line}</li>)}</ul></div>)}</>)}
        {skills && <><h3>Skills</h3><p>{skills}</p></>}
        {languages && <><h3>Languages</h3><p>{languages}</p></>}
      </div>
      <DownloadButton targetRef={ref} />
    </div>
  );
}

function ResumeTemplate2({ formData }) {
  const ref = useRef();
  const { name, email, phone, education, experience, skills, projects, profile, languages } = formData;

  return (
    <div style={{ padding: '10px' }}>
      <div ref={ref} className="a4-page">
        <div style={{ display: 'flex', height: '100%' }}>
          {/* Left Sidebar */}
          <div style={{ width: '40%', backgroundColor: '#333', color: '#fff', padding: '10px', boxSizing: 'border-box' }}>
            <h2>{name}</h2>
            <p>{email}<br />{phone}</p>
            {skills && (<><h4>Skills</h4><p>{skills}</p></>)}
            {languages && (<><h4>Languages</h4><p>{languages}</p></>)}
          </div>

          {/* Right Content */}
          <div style={{ width: '70%', padding: '10px', boxSizing: 'border-box', overflowY: 'auto' }}>
            {profile && (<><h3>Profile</h3><p>{profile}</p></>)}

            {education.some(e => e.school || e.degree || e.year || e.marks) && (
              <>
                <h3>Education</h3>
                {education.map((edu, idx) => (
                  (edu.school || edu.degree || edu.year || edu.marks) && (
                    <p key={idx}>{edu.degree} at {edu.school} ({edu.year}) - {edu.marks}</p>
                  )
                ))}
              </>
            )}

            {experience.some(e => e.role || e.company || e.duration || e.description) && (
              <>
                <h3>Experience</h3>
                {experience.map((e, i) => (
                  <div key={i}>
                    <b>{e.role}</b> at {e.company} ({e.duration})
                    <ul>{(e.description || '').split('\n').map((line, j) => <li key={j}>{line}</li>)}</ul>
                  </div>
                ))}
              </>
            )}

            {projects.some(p => p.name || p.description) && (
              <>
                <h3>Projects</h3>
                {projects.map((p, i) => (
                  <div key={i}>
                    <b>{p.name}</b>
                    <ul>{(p.description || '').split('\n').map((line, j) => <li key={j}>{line}</li>)}</ul>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <DownloadButton targetRef={ref} />
    </div>
  );
}


function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', profile: '', skills: '', languages: '',
    education: [{ degree: '', school: '', year: '', marks: '' }],
    experience: [{ role: '', company: '', duration: '', description: '' }],
    projects: [{ name: '', description: '' }]
  });

  const RenderTemplate = selectedTemplate === 'template2' ? ResumeTemplate2 : ResumeTemplate1;

  return (
    <div className="app-container">
	  <div className="card form-card">
		<TemplateSelector selected={selectedTemplate} setSelected={setSelectedTemplate} />
		<FormSection formData={formData} setFormData={setFormData} />
	  </div>
	  <div className="card preview-card">
		<RenderTemplate formData={formData} />
	  </div>
	</div>

  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
