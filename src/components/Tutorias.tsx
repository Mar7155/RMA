import { useState, useMemo, useEffect } from 'react'
import { format, isBefore, startOfToday, addMonths, isSameDay, isAfter, addMinutes } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { da, es } from 'date-fns/locale';
import { Clock, Users, BookOpen, Loader2 } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label'

interface Cita {
  tutor_id: string;
  usuario_id: string;
  fecha: string;
  descripcion: string;
  area_id: string;
  duracion: string;
  startTime: string;
  endTime: string;
}

export default function BookingPage() {

  const [loading, setLoading] = useState(true);
  const [responseMessage, setResponseMessage] = useState("");

  /* setear info de los tutores*/
  const [tutores, setTutores] = useState<any[]>([]);
  const [horarios, setHorarios] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);

  /* consultar citas*/
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [advisor, setAdvisor] = useState('')
  const [topic, setTopic] = useState({ topic: "", topicId: "" })
  const [nombreTutor, setNombreTutor] = useState('')
  const [duration, setDuration] = useState('')
  const [isAvailable, setIsAvailable] = useState(false)
  const [description, setDescription] = useState('')

  const [selectedTime, setSelectedTime] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const today = startOfToday();
  const range = addMonths(today, 2);

  useEffect(() => {
    const fetchTutores = async () => {
      try {

        const response = await fetch("http://localhost:3000/getAdvisorsInfo", {
          method: "GET",
        })

        if (!response.ok) {
          console.error("error al obtener los datos de los tutores");
        }

        const data = await response.json()
        const processedData = data.process.map((tutor: any) => ({
          tutor_id: tutor.id,
          tutor_nombre: tutor.nombre,
          tutor_apellidos: tutor.apellidos,
          correo: tutor.correo,
          horarios: tutor.horarios.map((h: any) => ({
            dia: h.dia,
            start: h.start,
            end: h.end,
          })),
          areas: tutor.areas.map((area: any) => ({
            id: area.area_id,
            nombre: area.area_nombre
          })),
        }));

        setTutores(processedData);
        setLoading(false)

      } catch (error) {
        console.error(error);

      }
    }
    fetchTutores()
  }, [])

  useEffect(() => {
    if (advisor) {
      const selectedTutor = tutores.find((tutor) => tutor.tutor_id === advisor);
      if (selectedTutor) {
        setAreas(selectedTutor.areas);

        setHorarios(selectedTutor.horarios);
        setNombreTutor(selectedTutor.tutor_nombre + " " + selectedTutor.tutor_apellidos)
      }
    }

  }, [advisor, tutores])

  const setTopicInfo = (value: { topic: string; topicId: string; }) => {
    setTopic(value)
  }

  const durations = [
    { value: '30', label: '30 minutos - Asesoria rapida' },
    { value: '60', label: '60 minutos - Sesion estandar' },
    { value: '90', label: '90 minutos - Sesion extendida' },
  ]

  const reservation = (async () => {
    const userData = localStorage.getItem('user')
    let user_id
    if (userData) {
      const userArray = userData ? JSON.parse(userData) : [];
      user_id = userArray.id
    }
    console.log("usuario id: " + user_id);

    console.log("tutor id: " + advisor);
    console.log("tema: " + topic);
    console.log("duracion: " + duration);
    if (date) {
      const dateformat = format(date, 'dd-MM-yyyy');
      console.log("fecha: " + dateformat);

    }
    console.log("hora: " + selectedTime);

  })

  const createHours = (time: string, minutesToAdd: number): string => {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date(0, 0, 0, hours, minutes); // Creamos un objeto Date
    const updatedDate = addMinutes(date, minutesToAdd); // Agregamos los minutos
    return format(updatedDate, "HH:mm");
  }


  const checkAvailability = async () => {
    setIsLoading(true)
    const userData = localStorage.getItem('user')
    const userArray = userData ? JSON.parse(userData) : [];
    if (!date) {
      setResponseMessage("debes de seleccionar una fecha")
      return
    }

    const dateformat = format(date, 'dd-MM-yyyy');

    const durationSelected: number = +duration;

    const end = createHours(selectedTime, durationSelected);


    const datosConsulta: Cita = {
      tutor_id: advisor,
      usuario_id: userArray.id,
      fecha: dateformat,
      descripcion: '',
      area_id: topic.id,
      duracion: duration,
      startTime: selectedTime,
      endTime: end
    }


    const response = await fetch("http://localhost:3000/checkAvaility", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosConsulta)
    })

    const data = await response.json();
    if (!response.ok) {
      setResponseMessage(data.message)
      setDate(undefined)
      setIsAvailable(false)
      setDescription('')
      setIsAvailable(false)
      setIsLoading(false)
    }

    if (response.ok) {
      setIsLoading(false)
      setIsAvailable(true)
      setResponseMessage(data.message)
    }

  }

  const handleBooking = async () => {
    if (!isAvailable) {
      await checkAvailability()
    }
  }

  const confirmBooking = async () => {

    if (description.length < 10) {
      setResponseMessage("Porfavor añade información detallada en la descripcion para continuar, debe contener un minimo de 20 caracteres")
      return;
    }

    const userData = localStorage.getItem('user')
    const userArray = userData ? JSON.parse(userData) : [];
    if (!date) {
      setResponseMessage("debes de seleccionar una fecha")
      return
    }

    const dateformat = format(date, 'dd-MM-yyyy');

    const durationSelected: number = +duration;

    const end = createHours(selectedTime, durationSelected);


    const datosCita: Cita = {
      tutor_id: advisor,
      usuario_id: userArray.id,
      fecha: dateformat,
      descripcion: description,
      area_id: topic.id,
      duracion: duration,
      startTime: selectedTime,
      endTime: end
    }

    const response = await fetch("http://localhost:3000/createAsesory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosCita),
    })

    const data = await response.json();
    if (!response.ok) {
      setResponseMessage("hubo un error al realizar la peticion intentalo más tarde ;(");
      console.log(data.message);
      setSelectedTime('');
      return;
    }
    // Reset form
    setDate(undefined)
    setAdvisor('')
    setDuration('')
    setSelectedTime('')
    setIsAvailable(false)
    setDescription('')
    setResponseMessage(data.message)
  }


  const horariosFiltrados = useMemo(() => {
    if (!date || !horarios.length) return []; // Si no hay fecha o horarios, retornar vacío

    // Día seleccionado en formato de texto (e.g., "lunes")
    const diaSeleccionado = format(date, 'EEEE', { locale: es }).toLowerCase();

    // Buscar horarios correspondientes al día seleccionado
    const horariosDelDia = horarios.filter((h) => h.dia === diaSeleccionado);

    // Generar intervalos de tiempo disponibles
    const tiemposDisponibles: string[] = [];
    horariosDelDia.forEach((h) => {
      const startHour = parseInt(h.start.split(':')[0], 10);
      const startMinute = parseInt(h.start.split(':')[1], 10);
      const endHour = parseInt(h.end.split(':')[0], 10);
      const endMinute = parseInt(h.end.split(':')[1], 10);

      let currentHour = startHour;
      let currentMinute = startMinute;

      while (
        currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)
      ) {
        tiemposDisponibles.push(
          `${currentHour.toString().padStart(2, '0')}:${currentMinute
            .toString()
            .padStart(2, '0')}`
        );

        // Avanzar 30 minutos
        currentMinute += 30;
        if (currentMinute >= 60) {
          currentMinute = 0;
          currentHour += 1;
        }
      }
    });

    return tiemposDisponibles;
  }, [date, horarios]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Selecciona un tutor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={advisor} onValueChange={setAdvisor}>
              <SelectTrigger>
                <SelectValue placeholder="Tutores" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-xl">
                <SelectGroup>
                  <SelectLabel>Tutores disponibles</SelectLabel>
                  {tutores.map((tutor) => (
                    <SelectItem key={tutor.tutor_id} value={tutor.tutor_id}>
                      <div>
                        <div className="font-medium">{tutor.tutor_nombre + " " + tutor.tutor_apellidos}</div>
                        <div className="text-sm text-muted-foreground">{ }</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {advisor && (<Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Selecciona un tema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={topic.topic}
              onValueChange={(id) => {
                const selected = areas.find((area) => area.id === id);
                if (selected) {
                  setTopicInfo(selected); // Actualiza el estado con el objeto completo
                }
              }}>
              <SelectTrigger>
                <SelectValue placeholder="Temas" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectLabel>Temas para consultar</SelectLabel>
                  {areas.map((area) => (
                    <SelectItem key={area.id} value={area.id}>
                      {area.nombre}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>)}

        {topic && (<Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Selecciona una duracion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue placeholder="Duracion" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-xl">
                <SelectGroup>
                  <SelectLabel>Duracion de la sesión</SelectLabel>
                  {durations.map((d) => (
                    <SelectItem key={d.value} value={d.value}>
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>)}

        {duration && (<Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Selecciona Hora y Fecha</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className=" flex justify-center rounded-lg border"
              disabled={(date) =>
                isBefore(date, today) ||
                isAfter(date, range) ||
                isSameDay(date, range)
              }
            />
            {date && (
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder={`Seleccione la hora para el: ${format(date, 'dd-MM-yyyy')}`} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectLabel>Horas disponibles</SelectLabel>
                    {horariosFiltrados.length > 0 ? (
                      horariosFiltrados.map((time, index) => (
                        <SelectItem key={index} value={time}>
                          {time}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">No hay horarios disponibles para esa fecha</div>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </CardContent>
        </Card>)}
      </div>

      {isAvailable && (
        <Card className="bg-white mt-6">
          <CardHeader>
            <CardTitle>Confirma tu asesoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Descripcion</Label>
                <Textarea
                  id="description"
                  placeholder="Añade informacion sobre tus dudas o preguntas para la sesión ^^"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <strong>Fecha de la asesoria:</strong> {date && format(date, 'dd-MM-yyyy')} a las {selectedTime}
              </div>
              <div>
                <strong>Tutor:</strong> {nombreTutor}
              </div>
              <div>
                <strong>Tema:</strong> {topic.nombre}
              </div>
              <div>
                <strong>Duracion:</strong> {durations.find(d => d.value === duration)?.label}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {responseMessage && <p className="text-center flex justify-center align-middle p-5 w-auto">{responseMessage}</p>}

      <div className="mt-5 flex justify-center">
        <Button
          size="lg"
          disabled={!advisor || !topic || !duration || !date || !selectedTime || isLoading}
          className="rounded-xl w-full max-w-md bg-red-500 text-white hover:bg-red-700"
          onClick={isAvailable ? confirmBooking : handleBooking}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Revisando disponibilidad
            </>
          ) : isAvailable ? (

            'Confirmar Asesoria'
          ) : (
            'Consultar Disponibilidad'
          )}
        </Button>
      </div>

    </div>
  )
}

