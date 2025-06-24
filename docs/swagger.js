const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Learning Progress Tracker API',
    version: '1.0.0',
    description: 'API Documentation for Node.js backend internship project'
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Local server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      UserRegister: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' }
        }
      },
      UserLogin: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string' },
          password: { type: 'string' }
        }
      },
      Course: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          modules: {
            type: 'array',
            items: { type: 'string' }
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      CourseInput: {
        type: 'object',
        required: ['title', 'description'],
        properties: {
          title: { type: 'string', example: 'Node.js Basics' },
          description: { type: 'string', example: 'Introduction to Node.js and Express' },
          modules: {
            type: 'array',
            items: { type: 'string' },
            example: ['Module 1: Intro', 'Module 2: Routing']
          }
        }
      }
    }
  },
  security: [{ bearerAuth: [] }],
  paths: {
    '/api/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  password: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'User created' },
          400: { description: 'User already exists' }
        }
      }
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login a user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Login successful' },
          400: { description: 'Invalid credentials' }
        }
      }
    },
    '/api/courses': {
      get: {
        tags: ['Course'],
        summary: 'Get all courses',
        description: 'Fetches a list of all courses. Public access.',
        responses: {
          200: {
            description: 'List of courses retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Course' }
                    }
                  }
                }
              }
            }
          },
          500: { description: 'Server error' }
        }
      },
      post: {
        tags: ['Course'],
        summary: 'Create a new course',
        description: 'Create a course (Admin only)',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CourseInput' }
            }
          }
        },
        responses: {
          201: {
            description: 'Course created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    data: { $ref: '#/components/schemas/Course' }
                  }
                }
              }
            }
          },
          400: { description: 'Missing title or description' },
          500: { description: 'Server error' }
        }
      }
    },
    '/api/courses/{id}': {
      put: {
        tags: ['Course'],
        summary: 'Update an existing course',
        description: 'Update a course by ID (Admin only)',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
            description: 'Course ID'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CourseInput' }
            }
          }
        },
        responses: {
          200: {
            description: 'Course updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    data: { $ref: '#/components/schemas/Course' }
                  }
                }
              }
            }
          },
          400: { description: 'No valid fields provided for update' },
          404: { description: 'Course not found' },
          500: { description: 'Server error' }
        }
      },
      delete: {
        tags: ['Course'],
        summary: 'Delete a course',
        description: 'Delete a course by ID (Admin only)',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
            description: 'Course ID'
          }
        ],
        responses: {
          200: { description: 'Course deleted successfully' },
          404: { description: 'Course not found' },
          500: { description: 'Server error' }
        }
      }
    },
    '/api/user/enroll': {
      post: {
        tags: ['Enrollment'],
        summary: 'Enroll in a course',
        description: 'Enroll the logged-in user in a specific course',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['courseId'],
                properties: {
                  courseId: {
                    type: 'string',
                    example: '6654adca6db924f61c2c3c2f'
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Enrollment successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    message: { type: 'string' },
                    data: {
                      type: 'object',
                      properties: {
                        course: {
                          type: 'object',
                          properties: {
                            id: { type: 'string' },
                            title: { type: 'string' },
                            description: { type: 'string' }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          400: { description: 'Already enrolled or missing courseId' },
          404: { description: 'User or course not found' },
          500: { description: 'Server error' }
        }
      }
    },
    '/api/user/progress': {
      put: {
        tags: ['Enrollment'],
        summary: 'Update course progress',
        description: 'Mark a module as completed for the logged-in user',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['courseId', 'module'],
                properties: {
                  courseId: {
                    type: 'string',
                    example: '6654adca6db924f61c2c3c2f'
                  },
                  module: {
                    type: 'string',
                    example: 'Introduction to Node.js'
                  }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Progress updated' },
          400: { description: 'Missing courseId or module' },
          404: { description: 'Not enrolled in this course' },
          500: { description: 'Server error' }
        }
      }
    },
    '/api/user/progress/{courseId}': {
      get: {
        tags: ['Enrollment'],
        summary: 'Get course progress',
        description: 'Get the progress of the logged-in user for a specific course',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'courseId',
            required: true,
            schema: { type: 'string' },
            description: 'ID of the course'
          }
        ],
        responses: {
          200: {
            description: 'Progress retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    data: {
                      type: 'object',
                      properties: {
                        course: { type: 'string' },
                        completedModules: { type: 'number' },
                        totalModules: { type: 'number' },
                        progress: { type: 'string', example: '60%' }
                      }
                    }
                  }
                }
              }
            }
          },
          404: { description: 'Not enrolled in this course' },
          500: { description: 'Server error' }
        }
      }
    },
    "/api/profile": {
      "put": {
        "summary": "Update user profile",
        "description": "Update user's bio and avatar. Requires authentication.",
        "tags": ["User"],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "bio": {
                    "type": "string",
                    "example": "Passionate AI developer."
                  },
                  "avatar": {
                    "type": "string",
                    "format": "binary",
                    "description": "Profile image file"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Profile updated successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "_id": {
                          "type": "string",
                          "example": "685aa169cebca281f8db9807"
                        },
                        "name": {
                          "type": "string",
                          "example": "Balaji"
                        },
                        "email": {
                          "type": "string",
                          "example": "balajiramu23@gmail.com"
                        },
                        "bio": {
                          "type": "string",
                          "example": "Passionate AI developer."
                        },
                        "avatar": {
                          "type": "string",
                          "example": "/uploads/685aa169-1723243242-profile.jpg"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized (missing or invalid token)"
          },
          "500": {
            "description": "Failed to update profile"
          }
        }
      }
    },
    "/api/certificate/{courseId}": {
      "get": {
        "summary": "Get Course Completion Certificate",
        "description": "Returns a certificate if the user has completed all modules in the specified course.",
        "tags": ["Certificate"],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "courseId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            },
            "description": "ID of the course"
          }
        ],
        "responses": {
          "200": {
            "description": "Certificate data",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Course completed. Certificate generated."
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "course": {
                          "type": "string",
                          "example": "Introduction to Machine Learning"
                        },
                        "name": {
                          "type": "string",
                          "example": "Balaji"
                        },
                        "issuedOn": {
                          "type": "string",
                          "example": "2025-06-24"
                        },
                        "certificateUrl": {
                          "type": "string",
                          "example": "https://yourdomain.com/certificates/685aa7eed696f137c0ea45b9/Balaji.pdf"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "403": {
            "description": "Course not yet completed",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": false
                    },
                    "message": {
                      "type": "string",
                      "example": "Complete all modules to get your certificate"
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Not enrolled in course or course not found"
          }
        }
      }
    }
  }
}

export default swaggerDocument;















