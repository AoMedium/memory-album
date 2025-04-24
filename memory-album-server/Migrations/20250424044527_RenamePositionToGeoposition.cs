using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MemoryAlbumServer.Migrations
{
    /// <inheritdoc />
    public partial class RenamePositionToGeoposition : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Location_Longitude",
                table: "Events",
                newName: "Position_Longitude");

            migrationBuilder.RenameColumn(
                name: "Location_Latitude",
                table: "Events",
                newName: "Position_Latitude");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Position_Longitude",
                table: "Events",
                newName: "Location_Longitude");

            migrationBuilder.RenameColumn(
                name: "Position_Latitude",
                table: "Events",
                newName: "Location_Latitude");
        }
    }
}
