﻿using IntegratedCourseSystem.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IntegratedCourseSystem
{
    public class AddUserMiddleware
    {
        private readonly RequestDelegate _next;

        public AddUserMiddleware(RequestDelegate next)
        {
            this._next = next;
        }

        public async System.Threading.Tasks.Task InvokeAsync(HttpContext context, IntegratedCourseSystemContext db)
        {
            db.Users.Add(new User { Login = "example", Password = "superpass", Role = 2});
            //db.Users.RemoveRange(db.Users);
            db.SaveChanges();
            db.Dispose();
            await _next.Invoke(context);
        }
    }
}