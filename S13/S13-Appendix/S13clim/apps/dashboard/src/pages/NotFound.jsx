import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Card>
      <h2 className="mt-0">Pagină inexistentă</h2>
      <p className="m-0">Ruta solicitată nu există în dashboard.</p>
      <Button className="mt-3" icon="pi pi-home" label="Înapoi la dashboard" onClick={() => navigate('/')} />
    </Card>
  );
}
