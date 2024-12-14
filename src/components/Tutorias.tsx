import { useState, useMemo, useEffect } from 'react'
import { format, isBefore, startOfToday, addMonths, isSameDay, isAfter } from 'date-fns'
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
import { Clock, Users, BookOpen } from 'lucide-react'

export default function BookingPage() {

  const [loading, setLoading] = useState(true);

  /* setear info de los tutores*/

  /* consultar citas*/
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [advisor, setAdvisor] = useState('')
  const [topic, setTopic] = useState('')
  const [duration, setDuration] = useState('')
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)

  const today = startOfToday();
  const range = addMonths(today, 2);

  useEffect(() => {
    const fetchTutores = async () => {
      try {
        console.log("oal");

        const response = await fetch("http://localhost:3000/getAdvisorsInfo", {
          method: "GET",
        })

        if (!response.ok) {
          console.error("a ocurrido un error, nse");

        }

        const data = await response.json()
        console.log(data);

        setLoading(false)

      } catch (error) {
        console.error(error);

      }
    }
    fetchTutores()
  }, [])

  const advisors = [
    { id: '1', name: 'Dr. Sarah Wilson', expertise: 'Business Strategy' },
    { id: '2', name: 'Prof. Michael Chen', expertise: 'Financial Planning' },
    { id: '3', name: 'Dr. Emily Rodriguez', expertise: 'Marketing Strategy' },
    { id: '4', name: 'James Thompson', expertise: 'Operations Management' },
  ]

  const topics = [
    'Business Development',
    'Financial Analysis',
    'Marketing Strategy',
    'Operations Optimization',
    'Leadership Development',
    'Digital Transformation',
  ]

  const durations = [
    { value: '30', label: '30 minutes - Quick Consultation' },
    { value: '60', label: '60 minutes - Standard Session' },
    { value: '90', label: '90 minutes - Extended Session' },
  ]

  const availableTimes = useMemo(() => {
    if (!date) return []
    // This is a placeholder. In a real application, you would fetch the tutor's availability.
    const times = []
    for (let i = 9; i < 18; i++) {
      times.push(`${i}:00`)
      times.push(`${i}:30`)
    }
    return times
  }, [date])

  const reservation = (() => {
    console.log(advisor);
    console.log(topic);
    console.log(duration);
    if (date) {
      const dateformat = format(date, 'dd-MM-yyyy');
      console.log(dateformat);

    }
    console.log(duration);
    console.log(selectedTime);

  })

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
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
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectLabel>Tutores disponibles</SelectLabel>
                  {advisors.map((adv) => (
                    <SelectItem key={adv.id} value={adv.id}>
                      <div>
                        <div className="font-medium">{adv.name}</div>
                        <div className="text-sm text-muted-foreground">{adv.expertise}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {advisor && (<Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Selecciona un tema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger>
                <SelectValue placeholder="Temas" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectLabel>Temas para consultar</SelectLabel>
                  {topics.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>)}

        {topic && (<Card>
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
              <SelectContent>
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

        {duration && (<Card>
          <CardHeader>
            <CardTitle>Selecciona Hora y Fecha</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className=" flex justify-center rounded-lg"
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
                    {availableTimes.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </CardContent>
        </Card>)}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={reservation}
          size="lg"
          disabled={!advisor || !topic || !duration || !date || !selectedTime}
          className="w-full max-w-md bg-red-500 hover:bg-red-700/90 rounded-xl"
        >
          Consultar Cita
        </Button>
      </div>
    </div>
  )
}

