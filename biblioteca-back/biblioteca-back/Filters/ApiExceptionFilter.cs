using biblioteca_back.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace biblioteca_back.Filters
{
    public class ApiExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            if (context.Exception is NotFoundException notFound)
            {
                context.Result = new NotFoundObjectResult(new { message = notFound.Message });
                context.ExceptionHandled = true;
            }
            else if (context.Exception is ConflictException conflict)
            {
                context.Result = new ConflictObjectResult(new { message = conflict.Message });
                context.ExceptionHandled = true;
            }
        }
    }
}
