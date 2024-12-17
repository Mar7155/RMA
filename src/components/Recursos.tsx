import { useState, useEffect } from "react";
import * as React from "react";
import "./Recursos.css";
import type { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const Recursos: React.FC<{ id: string }> = () => {
  const [recursos, setRecursos] = useState<any[]>([]);
  const [filteredRecursos, setFilteredRecursos] = useState<any[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [tipos, setTipos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [areaFilters, setAreaFilters] = useState<{ [key: string]: boolean }>({});
  const [tipoFilters, setTipoFilters] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch("http://localhost:3000/getAreas", {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("No se pudieron cargar las áreas");
        }

        const data = await response.json();
        
        const areaNames = data.Areas.map((area: { area_nombre: string }) => area.area_nombre);
        setAreas(areaNames);

        const initialAreaFilters = areaNames.reduce(
          (acc: { [key: string]: boolean }, area: string) => {
            acc[area] = false;
            return acc;
          },
          {}
        );

        setAreaFilters(initialAreaFilters);
      } catch (error) {
        console.error("Error al cargar las áreas:", error);
        setError("Error al cargar las áreas.");
      }
    };

    const fetchTipos = async () => {
      try {
        const response = await fetch("http://localhost:3000/getTipos", {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("No se pudieron cargar los tipos");
        }

        const data = await response.json();
        
        const tipoNames = data.Tipos.map((tipo: { tipo_nombre: string }) => tipo.tipo_nombre);
        setTipos(tipoNames);

        const initialTipoFilters = tipoNames.reduce(
          (acc: { [key: string]: boolean }, tipo: string) => {
            acc[tipo] = false;
            return acc;
          },
          {}
        );

        setTipoFilters(initialTipoFilters);
      } catch (error) {
        console.error("Error al cargar los tipos:", error);
        setError("Error al cargar los tipos.");
      }
    };

    const fetchRecursos = async () => {
      try {
        const response = await fetch("http://localhost:3000/getProductos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            categoria: "Recurso",
          }),
        });

        if (!response.ok) {
          throw new Error("No se pudieron cargar los recursos");
        }

        const data = await response.json();
        
        console.log(data.Productos);
        
        setRecursos(data.Productos);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar los recursos:", error);
        setError("Error al cargar los recursos.");
      }
    };

    fetchAreas();
    fetchTipos();
    fetchRecursos();
  }, []);

  useEffect(() => {
    const filtered = recursos.filter((item: any) => {
      const activeAreaFilters = Object.keys(areaFilters).filter(
        (key) => areaFilters[key]
      );
      const activeTipoFilters = Object.keys(tipoFilters).filter(
        (key) => tipoFilters[key]
      );

      const matchesArea =
        activeAreaFilters.length === 0 ||
        item.productoAreas.some((areaObj: any) =>
          activeAreaFilters.includes(areaObj.area.area_nombre)
        );

      const matchesTipo =
        activeTipoFilters.length === 0 ||
        item.productoTipos.some((tipoObj: any) =>
          activeTipoFilters.includes(tipoObj.tipo.tipo_nombre)
        );

      return matchesArea && matchesTipo;
    });

    setFilteredRecursos(filtered);
  }, [recursos, areaFilters, tipoFilters]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleAreaFilterChange = (area: string, checked: boolean) => {
    setAreaFilters((prev) => ({
      ...prev,
      [area]: checked,
    }));
  };

  const handleTipoFilterChange = (tipo: string, checked: boolean) => {
    setTipoFilters((prev) => ({
      ...prev,
      [tipo]: checked,
    }));
  };

  return (
    <>
      <div className="principal">
        <div className="filter-box">
          <div className="child-box">
            <span className="text-filtrar">Filtrar por área:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="btn-outline">Áreas</button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="category-box">
                <DropdownMenuLabel>Selecciona Áreas</DropdownMenuLabel>
                {areas.map((area) => (
                  <DropdownMenuCheckboxItem
                    key={area}
                    checked={areaFilters[area]}
                    onCheckedChange={(checked) =>
                      handleAreaFilterChange(area, !!checked)
                    }
                  >
                    {area}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="child-box">
            <span className="text-filtrar">Filtrar por tipo:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="btn-outline">Tipos</button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="category-box">
                <DropdownMenuLabel>Selecciona Tipos</DropdownMenuLabel>
                {tipos.map((tipo) => (
                  <DropdownMenuCheckboxItem
                    key={tipo}
                    checked={tipoFilters[tipo]}
                    onCheckedChange={(checked) =>
                      handleTipoFilterChange(tipo, !!checked)
                    }
                  >
                    {tipo}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="document-grid-container">
          <div className="document-grid">
            {filteredRecursos.map((recurso) => (
              <div
                key={recurso.producto_id}
                className="card"
                onClick={() => {
                  window.location.href = `/views/${recurso.producto_id}?titulo=${encodeURIComponent(
                    recurso.producto_nombre
                  )}&descripcion=${encodeURIComponent(
                    recurso.producto_descripcion
                  )}&tipo=${encodeURIComponent(
                    recurso.productoTipos[0].tipo.tipo_nombre
                  )}&area=${encodeURIComponent(
                    recurso.productoAreas[0].area.area_nombre
                  )}&url=${encodeURIComponent(recurso.producto_url)}`;
                }}
              >
                <div className="thumbnail-container">
                  <img
                    src="/placeholder.svg?height-200&width-300"
                    alt={recurso.producto_nombre}
                    className="thumbnail"
                  />
                  <div className="content"></div>
                  <h2 className="document-title">{recurso.producto_nombre}</h2>
                  <p className="document-description">
                    {recurso.producto_descripcion}
                  </p>
                  <button className="btn btn-white">
                    {recurso.productoTipos[0].tipo.tipo_nombre}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Recursos;
