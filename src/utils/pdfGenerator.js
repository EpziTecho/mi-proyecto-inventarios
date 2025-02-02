const PDFDocument = require("pdfkit");
const VendedorService = require("../services/vendedor.service");

//TODO
//MEJORAR EL ESPACIADO DEL CUERPO DE LA TABLA
function generateHeader(pdfDoc) {
    pdfDoc
        .font("Helvetica-Bold")
        .fontSize(18)
        .text("Reporte de Vendedores", { align: "center" })
        .moveDown(2);
}

function generateFooter(pdfDoc, pageNumber, totalPages) {
    pdfDoc
        .fontSize(10)
        .text(`Página ${pageNumber} de ${totalPages}`, 50, 750, {
            align: "center",
            width: 500,
        })
        .moveDown();
    pdfDoc
        .fontSize(10)
        .text(
            `Fecha de generación: ${new Date().toLocaleDateString("es-ES")}`,
            450,
            750
        );
}

function generateHr(pdfDoc, y_padding) {
    pdfDoc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y_padding)
        .lineTo(550, y_padding)
        .stroke();
}

function generateTable(pdfDoc, data) {
    var tableTop = pdfDoc.y + 20; // Aumento del espacio entre título y tabla
    generateTableRow(pdfDoc, tableTop, Object.keys(data[0]), true);
    generateHr(pdfDoc, tableTop + 20);
    for (var index in data) {
        const item = data[index];
        const position = tableTop + (Number(index) + 1) * 30 + 10; // Ajuste de espaciado entre filas
        generateTableRow(pdfDoc, position, Object.values(item));
    }
}

function generateTableRow(pdfDoc, yPosition, rowData, isHeading = false) {
    var xPosition = 50;
    const columnWidths = {
        NUM: 20, // Número de fila (más pequeño)
        ID: 30, // ID (más compacto)
        NOMBRE: 150, // Más estrecho para nombres y apellidos
        DNI: 60, // Documento de identidad (más estrecho)
        EMAIL: 160, // Más estrecho para emails
        TFNO: 60, // Teléfono (más estrecho)
        ESTADO: 40, // Estado (más pequeño)
    };

    for (var i in rowData) {
        const columnName = Object.keys(columnWidths)[i] || "DEFAULT";
        var width = columnWidths[columnName] || 50;

        var color = isHeading ? "black" : "#000000";
        var font = isHeading ? "Helvetica-Bold" : "Helvetica";

        // Dibujar el borde de la celda
        pdfDoc
            .rect(xPosition, yPosition, width, 20) // Ajusta la altura de la celda (20)
            .stroke();

        // Escribir el texto dentro de la celda
        pdfDoc
            .fontSize(9) // Reducir el tamaño de la fuente
            .font(font)
            .fillColor(color)
            .text(rowData[i], xPosition, yPosition + 5, {
                // Ajustar la posición vertical del texto
                width: width,
                align: "center",
            });

        xPosition += width + 5; // Reducir el espacio entre columnas
    }
}

async function generateVendedoresPDF(res, atributos) {
    const vendedores = await VendedorService.listar();
    if (!vendedores || vendedores.length === 0) {
        throw new Error("No hay datos disponibles para exportar.");
    }

    res.setHeader(
        "Content-Disposition",
        "attachment; filename=Reporte_vendedores.pdf"
    );
    res.setHeader("Content-Type", "application/pdf");

    const doc = new PDFDocument({ margin: 50, size: "A4", bufferPages: true });
    doc.pipe(res);

    generateHeader(doc);

    let tableData = vendedores.map((vendedor, index) => {
        let row = { NUM: index + 1 };
        atributos.forEach((attr) => {
            row[
                attr.toUpperCase() === "IDVENDEDOR" ? "ID" : attr.toUpperCase()
            ] = vendedor[attr] !== undefined ? vendedor[attr] : "N/A";
        });
        return row;
    });

    generateTable(doc, tableData);

    const range = doc.bufferedPageRange();
    for (let i = 0; i < range.count; i++) {
        doc.switchToPage(i);
        generateFooter(doc, i + 1, range.count);
    }

    doc.end();
}

module.exports = { generateVendedoresPDF };
