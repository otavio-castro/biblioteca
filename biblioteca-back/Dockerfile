FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["biblioteca-back/biblioteca-back.csproj", "biblioteca-back/"]
RUN dotnet restore "biblioteca-back/biblioteca-back.csproj"

COPY . .
RUN dotnet publish "biblioteca-back/biblioteca-back.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "biblioteca-back.dll"]
