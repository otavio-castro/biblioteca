using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace biblioteca_back.Migrations
{
    /// <inheritdoc />
    public partial class AddImagemUrlToItensBiblioteca : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImagemUrl",
                table: "ItensBiblioteca",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagemUrl",
                table: "ItensBiblioteca");
        }
    }
}
