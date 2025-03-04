---
title: Bem vindos
hide_table_of_contents: true
---

### Uniii Docs

Bem vindo a minha pagina de anotações, aqui com minhas **unilises** (erros de português) deixo minhas observações sobre os temas que estudo.




### Acessa as anotações: 

import Link from '@docusaurus/Link';
import { Code, Cloud, Server } from 'lucide-react'; // Importando os ícones

<div style={{
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'center',
}}>
  
  <Link to="/docs/developer-notes" style={{ textDecoration: 'none', flex: '1 1 300px' }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      backgroundColor: '#e91e63',
      color: '#ffffff',
      padding: '15px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.05)';
      e.currentTarget.style.boxShadow = '0px 6px 10px rgba(0, 0, 0, 0.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
    }}>
      <Code size={24} strokeWidth={1.5} />
      <span>Developer Notes</span>
    </div>
  </Link>

  <Link to="/docs/cloud-notes" style={{ textDecoration: 'none', flex: '1 1 300px' }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      backgroundColor: '#9C27B0',
      color: '#ffffff',
      padding: '15px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.05)';
      e.currentTarget.style.boxShadow = '0px 6px 10px rgba(0, 0, 0, 0.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
    }}>
      <Cloud size={24} strokeWidth={1.5} />
      <span>Cloud Notes</span>
    </div>
  </Link>

  <Link to="docs/devops-notes" style={{ textDecoration: 'none', flex: '1 1 300px' }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      backgroundColor: '#FF4081',
      color: '#ffffff',
      padding: '15px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.05)';
      e.currentTarget.style.boxShadow = '0px 6px 10px rgba(0, 0, 0, 0.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
    }}>
      <Server size={24} strokeWidth={1.5} />
      <span>DevOps Notes</span>
    </div>
  </Link>
</div>
