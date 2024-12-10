'use client'

import { useState, useMemo } from 'react'
import { format } from 'date-fns'
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
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [advisor, setAdvisor] = useState('')
  const [topic, setTopic] = useState('')
  const [duration, setDuration] = useState('')
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)

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

  console.log(date);
  
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
                <SelectValue placeholder="Choose an advisor" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectLabel>Available Advisors</SelectLabel>
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Temas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a topic" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectLabel>Consultation Topics</SelectLabel>
                  {topics.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Duracion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue placeholder="Choose duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Session Length</SelectLabel>
                  {durations.map((d) => (
                    <SelectItem key={d.value} value={d.value}>
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hora y Fecha</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className=" flex justify-center rounded-lg"
            />
            {date && (
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectLabel>Available Times</SelectLabel>
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
        </Card>
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          size="lg"
          disabled={!advisor || !topic || !duration || !date || !selectedTime}
          className="w-full max-w-md bg-red-500 hover:bg-red-700/90 rounded-xl"
        >
          Book Consultation
        </Button>
      </div>
    </div>
  )
}

