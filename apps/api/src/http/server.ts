import fastifyCors from '@fastify/cors'
import * as fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { env } from '@saas/env'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { errorHandler } from '@/http/error-handler.ts'
import { authenticateWithGithub } from '@/http/routes/auth/authenticate-with-github.ts'
import { authenticateWithPassword } from '@/http/routes/auth/authenticate-with-password'
import { getProfile } from '@/http/routes/auth/get-profile.ts'
import { requestPasswordRecover } from '@/http/routes/auth/request-password-recover.ts'
import { resetPassword } from '@/http/routes/auth/reset-password.ts'
import { createInvite } from '@/http/routes/invites/create-invite.ts'
import { getInvite } from '@/http/routes/invites/get-invite.ts'
import { getInvites } from '@/http/routes/invites/get-invites.ts'
import { getMembers } from '@/http/routes/members/get-members.ts'
import { removeMember } from '@/http/routes/members/remove-member.ts'
import { updateMember } from '@/http/routes/members/update-member.ts'
import { createOrganization } from '@/http/routes/orgs/create-organization.ts'
import { getMembership } from '@/http/routes/orgs/get-membership'
import { getOrganization } from '@/http/routes/orgs/get-organization.ts'
import { getOrganizations } from '@/http/routes/orgs/get-organizations.ts'
import { shutdownOrganization } from '@/http/routes/orgs/shutdown-organization.ts'
import { transferOrganization } from '@/http/routes/orgs/transfer-organization.ts'
import { updateOrganization } from '@/http/routes/orgs/update-organization.ts'
import { createProject } from '@/http/routes/projects/create-project.ts'
import { deleteProject } from '@/http/routes/projects/delete-project.ts'
import { getProject } from '@/http/routes/projects/get-project.ts'
import { getProjects } from '@/http/routes/projects/get-projects.ts'
import { updateProject } from '@/http/routes/projects/update-project.ts'

import { createAccount } from './routes/auth/create-account'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Next.js SaaS',
      description: 'Full-stack SaaS with multi-tenant & RBAC.',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors)

app.register(createAccount)
app.register(authenticateWithPassword)
app.register(authenticateWithGithub)
app.register(getProfile)
app.register(requestPasswordRecover)
app.register(resetPassword)

app.register(createOrganization)
app.register(getMembership)
app.register(getOrganization)
app.register(getOrganizations)
app.register(updateOrganization)
app.register(shutdownOrganization)
app.register(transferOrganization)

app.register(createProject)
app.register(deleteProject)
app.register(getProject)
app.register(getProjects)
app.register(updateProject)

app.register(getMembers)
app.register(updateMember)
app.register(removeMember)

app.register(createInvite)
app.register(getInvite)
app.register(getInvites)

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log('HTTP server running!')
})
