"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github, Users, Shield } from 'lucide-react'
import { inviteUserToOrg } from '../_actions/server-actions'

export default function JoinOrganization() {
    const [username, setUsername] = useState("")
    const [orgPassword, setOrgPassword] = useState("")
    const [message, setMessage] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setMessage(null)

        startTransition(() => {
            inviteUserToOrg(username, orgPassword).then(res => {
                if (res.success) {
                    setMessage("Invitation sent successfully!")
                } else {
                    setMessage(`Error: ${res.error}`)
                }
            })
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 rounded-full mb-4">
                        <Github className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Join SpikeStudents</h1>
                    <p className="text-slate-600">Enter your details to become part of our GitHub community</p>
                </div>

                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-xl font-semibold text-center">Organization Access</CardTitle>
                        <CardDescription className="text-center">
                            Provide your GitHub username and the organization password to join
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="github-username" className="text-sm font-medium text-slate-700">
                                    GitHub Username
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="github-username"
                                        name="github-username"
                                        type="text"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        placeholder="your-github-username"
                                        className="pl-10 h-11 border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                                        required
                                    />
                                    <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="org-password" className="text-sm font-medium text-slate-700">
                                    Organization Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="org-password"
                                        name="org-password"
                                        type="password"
                                        value={orgPassword}
                                        onChange={e => setOrgPassword(e.target.value)}
                                        placeholder="Enter organization password"
                                        className="pl-10 h-11 border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                                        required
                                    />
                                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                </div>
                                <p className="text-xs text-slate-500">
                                    This is not your GitHub password, but the password provided by the organization admin
                                </p>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-medium transition-colors duration-200"
                                disabled={isPending}
                            >
                                <Users className="w-4 h-4 mr-2" />
                                {isPending ? "Sending..." : "Join Organization"}
                            </Button>

                            {message && (
                                <p className={`text-sm mt-2 ${message.startsWith('Invitation sent successfully!') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>
                            )}
                        </form>

                        <div className="pt-4 border-t border-slate-100">
                            <div className="flex items-start space-x-3 text-sm text-slate-600">
                                <Shield className="w-4 h-4 mt-0.5 text-slate-400 flex-shrink-0" />
                                <p>
                                    Your information is secure and will only be used to verify your access to the organization.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="text-center mt-6 text-sm text-slate-500">
                    Need help? Ping @Nathan Edgington in our Slack.
                </div>
            </div>
        </div>
    )
}
