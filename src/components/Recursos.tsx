import { useState, useEffect, useCallback } from 'react'
import * as React from "react"
import './Recursos.css'
import { Check } from "lucide-react"

"use client"

import type { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


type Checked = DropdownMenuCheckboxItemProps["checked"]


interface Recursos {
  id: string
  status: string
  title: string
  description: string
  thumbnail: string
  tag: string
}


const getInfo = () => [
  {
    id: "1",
    status: "cerebro",
    title: "Lorem ipsum dolor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ejusmod tempor incididunt ",
    thumbnail: "/placeholder.svg?height-200&width=300",
    tag: "Presentación"
  },

  {
    id: "2",
    status: "neurociencia",
    title: "Lorem ipsum dolor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ejusmod tempor incididunt ",
    thumbnail: "/placeholder.svg?height-200&width=300",
    tag: "Artículo"
  },

  {
    id: "3",
    status: "neurociencia",
    title: "Lorem ipsum dolor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ejusmod tempor incididunt ",
    thumbnail: "/placeholder.svg?height-200&width=300",
    tag: "Libro"
  },

  {
    id: "4",
    status: "cerebro",
    title: "Lorem ipsum dolor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ejusmod tempor incididunt ",
    thumbnail: "/placeholder.svg?height-200&width=300",
    tag: "Presentación"
  },

  {
    id: "5",
    status: "anatomia",
    title: "Lorem ipsum dolor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ejusmod tempor incididunt ",
    thumbnail: "/placeholder.svg?height-200&width=300",
    tag: "Libro"
  },

  {
    id: "14",
    status: "anatomia",
    title: "Lorem ipsum dolor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ejusmod tempor incididunt ",
    thumbnail: "/placeholder.svg?height-200&width=300",
    tag: "Artículo"
  },

  {
    id: "7",
    status: "cerebro",
    title: "Lorem ipsum dolor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ejusmod tempor incididunt ",
    thumbnail: "/placeholder.svg?height-200&width=300",
    tag: "Presentación"
  },

  {
    id: "8",
    status: "neurociencia",
    title: "Lorem ipsum dolor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ejusmod tempor incididunt ",
    thumbnail: "/placeholder.svg?height-200&width=300",
    tag: "Libro"
  },

  {
    id: "9",
    status: "neurociencia",
    title: "Lorem ipsum dolor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ejusmod tempor incididunt ",
    thumbnail: "/placeholder.svg?height-200&width=300",
    tag: "Artículo"
  },

  {
    id: "10",
    status: "anatomia",
    title: "Lorem ipsum dolor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ejusmod tempor incididunt ",
    thumbnail: "/placeholder.svg?height-200&width=300",
    tag: "Presentación"
  },


  {
    id: "12",
    status: "anatomia",
    title: "Lorem ipsum dolor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ejusmod tempor incididunt ",
    thumbnail: "/placeholder.svg?height-200&width=300",
    tag: "Libro"
  },

  {
    id: "6",
    status: "neurociencias",
    title: "Lorem ipsum dolor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ejusmod tempor incididunt ",
    thumbnail: "/placeholder.svg?height-200&width=300",
    tag: "Artículo"
  },
];



function Recursos({ id }: { id: string }): JSX.Element {
  const [info, setInfo] = useState(getInfo());
  const [selected, setSelected] = useState<string | null>(null);
  const [filtro, setFiltro] = useState('');

  const handleCheckboxChange = (id: string) => {
    setSelected(id);
  };

  const [loading, setLoading] = useState(true);

  const [showAnatomia, setShowAnatomia] = React.useState<Checked>(false)
  const [showNeurociencia, setShowNeurociencia] = React.useState<Checked>(false)
  const [showCerebro, setShowCerebro] = React.useState<Checked>(false)

  const [showPresentacion, setShowPresentacion] = React.useState<Checked>(false)
  const [showLibro, setShowLibro] = React.useState<Checked>(false)
  const [showArticulo, setShowArticulo] = React.useState<Checked>(false)

  useEffect(() => {
    setInfo(
      getInfo().filter((item) => {
        const filterMateria = (
          (showAnatomia && item.status === "anatomia") ||
          (showNeurociencia && item.status === "neurociencia") ||
          (showCerebro && item.status === "cerebro")
        );

        const filterRecurso = (
          (showPresentacion && item.tag === "Presentación") ||
          (showLibro && item.tag === "Libro") ||
          (showArticulo && item.tag === "Artículo")
        );

        const noFilterSelected =
          !showAnatomia && !showNeurociencia && !showCerebro &&
          !showPresentacion && !showLibro && !showArticulo;

        return (
          noFilterSelected ||
          (filterMateria && filterRecurso) ||
          (filterMateria && !showPresentacion && !showLibro && !showArticulo) ||
          (!showAnatomia && !showNeurociencia && !showCerebro && filterRecurso)
        );

      })
    )
  }, [showAnatomia, showNeurociencia, showCerebro, showPresentacion, showArticulo, showLibro])

  const [orderBy, setOrderBy] = React.useState('')

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
                  checked={showAnatomia}
                  onCheckedChange={setShowAnatomia}
                >
                  Anatomia
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showNeurociencia}
                  onCheckedChange={setShowNeurociencia}
                >
                  Neurociencia
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showCerebro}
                  onCheckedChange={setShowCerebro}
                >
                  Cerebro
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
            {info.map(item => (
              <div key={item.id} className="card">
                <div className='thumbnail-container'>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className='thumbnail'
                  />
                  <div className='content'></div>
                  <h2 className='document-title'>{item.title}</h2>
                  <p className='document-description'>{item.description}</p>
                  <button className='btn btn-white'>{item.tag}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Recursos

