import { useState, useEffect } from 'react'
import * as React from "react"
import './Recursos.css'
import type { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

function Recursos({ id }: { id: string }): JSX.Element {
  const [recursos, setRecursos] = useState<any[]>([]);  
  const [filteredRecursos, setFilteredRecursos] = useState<any[]>([]);  
  const [loading, setLoading] = useState(true);

  const [showBiotica, setShowBiotica] = React.useState<Checked>(false);
  const [showFarmaciologia, setShowFarmaciologia] = React.useState<Checked>(false);
  const [showAnatomia, setShowAnatomia] = React.useState<Checked>(false);

  const [showPresentacion, setShowPresentacion] = React.useState<Checked>(false);
  const [showLibro, setShowLibro] = React.useState<Checked>(false);
  const [showArticulo, setShowArticulo] = React.useState<Checked>(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/elements.controllers/getRecursos.controller");
        if (!response.ok) {
          throw new Error('No se pudieron cargar los Recursos :(');
        }
        const data = await response.json();        
        setRecursos(data.recursos);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const filtered = recursos.filter((item: { areas_nombre: string; tipo_nombre: string }) => {

      const filterMateria =
        (showBiotica && item.areas_nombre === "Biotica") ||
        (showFarmaciologia && item.areas_nombre === "Farmaciologia") ||
        (showAnatomia && item.areas_nombre === "Anatomia");

      const filterRecurso =
        (showPresentacion && item.tipo_nombre === "Presentacion") ||
        (showLibro && item.tipo_nombre === "Libro") ||
        (showArticulo && item.tipo_nombre === "Articulo");

      const noFilterSelected =
        !showBiotica && !showFarmaciologia && !showAnatomia &&
        !showPresentacion && !showLibro && !showArticulo;

      return (
        noFilterSelected ||
        (filterMateria && filterRecurso) ||
        (filterMateria && !showPresentacion && !showLibro && !showArticulo) ||
        (!showBiotica && !showFarmaciologia && !showAnatomia && filterRecurso)
      );
    });

    setFilteredRecursos(filtered);
  }, [recursos, showBiotica, showFarmaciologia, showAnatomia, showPresentacion, showLibro, showArticulo]);

  if (loading) {
    return <div>Cargando... ^^ </div>;
  }

  return (
    <>
      <div className='principal'>
        <div className="filter-box">
          <div className="child-box">
            <span className="text-filtrar">Filtrar:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="btn-outline">Materia</button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="category-box">
                <DropdownMenuLabel>Selecciona</DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={showBiotica}
                  onCheckedChange={setShowBiotica}
                >
                  Biotica
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showFarmaciologia}
                  onCheckedChange={setShowFarmaciologia}
                >
                  Farmacologia
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showAnatomia}
                  onCheckedChange={setShowAnatomia}
                >
                  Anatomia
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="filter-box">
            <span className="child-box">Ordenar por:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="btn-outline">Selecciona</button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="category-box">
                <DropdownMenuLabel>Recursos</DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={showPresentacion}
                  onCheckedChange={(checked) => setShowPresentacion(!!checked)}
                >
                  Presentación
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showLibro}
                  onCheckedChange={(checked) => setShowLibro(!!checked)}
                >
                  Libro
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showArticulo}
                  onCheckedChange={(checked) => setShowArticulo(!!checked)}
                >
                  Artículo
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className='document-grid-container'>
          <div className='document-grid'>
            {filteredRecursos.map(recurso => (
              <div key={recurso.recursos_id} className="card">
                <div className='thumbnail-container'>
                  <img
                    src="/placeholder.svg?height-200&width-300"
                    alt={recurso.recursos_titulo}
                    className='thumbnail'
                  />
                  <div className='content'></div>
                  <h2 className='document-title'>{recurso.recursos_titulo}</h2>
                  <p className='document-description'>{recurso.recursos_descripcion}</p>
                  <button className='btn btn-white'>{recurso.tipo_nombre}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Recursos;
