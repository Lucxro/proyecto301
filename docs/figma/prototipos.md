# Prototipos del Proyecto

## Información del Documento

**Última actualización:** 13/10/2025
**Versión del prototipo:** [v1.0]  
**Herramienta:** Figma  

---

## Propósito del Prototipo

Este documento centraliza toda la información sobre los **diseños y prototipos** creados en Figma para el proyecto. Sirve como **puente entre el diseño UX/UI y el desarrollo técnico**, facilitando la implementación durante los sprints.

**Objetivos del prototipo:**
- Validar la **experiencia de usuario** antes de desarrollar
- Alinear la **visión del producto** entre todos los miembros del equipo
- Servir como **referencia visual** durante el desarrollo backend y frontend
- Documentar las **decisiones de diseño** tomadas en cada sprint

---

## Enlaces Principales

### Proyecto Principal
**URL:** https://www.figma.com/design/kHzqC6SNOhFtYuCpFiGZkZ/Tienda-de-celulares?node-id=0-1&t=6JIiRAYLGjdnjBt9-1

---

## Estructura del Prototipo

### Sistema de Diseño

**Paleta de colores:**
- **Color primario:** #1D4ED8 - Acciones principales
- **Color de fondo:** #ffffff - Elementos complementarios
- **Color de acento:** #F97316- Llamadas a la acción
- **Degradado principal:** #1D4ED8 (100%) / #0F2972 (100%)
- **Color texto principal:** #4B5563
- **Colores de estado:**
  - Éxito: #10B981
  - Error: #F61E1E
  - Advertencia: #F59E0B
  - Info: #4B5563

**Tipografía:**
- **Principal mobile:** Montserrat 16 - Textos y contenido
- **Principal desktop:** Montserrat 20 - Textos y contenido
- **Títulos mobile:** Roboto 24 - Encabezados
- **Títulos desktop:** Roboto 40 - Encabezados


**Espaciado:**
- Sistema de **8px grid**
- Espaciado base (mobile): 16px
- Espaciado base (desktop): 20px

---

## Pantallas incluidas:**
### Flujo Principal
1. **Inicio del sistema**
  `docs/figma/pantallas/INICIO.svg`

2. **Formulario de registro**
   `docs/figma/pantallas/Registro.svg`

3. **Flujo de pago**
   `docs/figma/pantallas/Formulario_envio.svg` / `docs/figma/pantallas/Pagar_ahora.svg`

4. **Catalogo de productos**
   `docs/figma/pantallas/CATALOGO.svg`

**Interacciones prototipadas:**
- Navegación entre pantallas
- Validación de formularios
- Mensajes de error/éxito
- Estados de carga (loading)


## 🧩 Componentes Reutilizables


**Componentes diseñados:**

#### Botones
- **Principal:** Diseñado para cambiar de interfaz (Ingresar, registrarse, continuar y pagar ahora)
- **Secundario:** sirve para ver detalles de los equipos moviles (Ver detalles)
- **Botón con icono:** Este ayudará al cliente a tener en claro la acción que va a realizar (Agregar al carrito)
- **Variante hover:** Se cambia el color del botón al pasar en cursor.

#### Iconos 
- **De secciones:** Estos nos dan indicios de a donde nos vamos a dirigir cuando los presionemos (Perfil de usuario, carrito de compras o menu).
-**De cambio de imagen:** Nos serán de ayuda para que el usuario pueda cambiar las diferentes imágenes del carrusel.

#### Carrusel
- **De imágenes:** Cuando el usuario presione los iconos "<" ">" cambiará de imágenes de una manera muy sutil.

#### Tarjetas
- **De información básica:** Da un resumen de la información general de los equipos moviles.
- **De información detallada:** Nos detalla exactamente las caraterísticas que tiene el celular a elegie.
- **De contacto:** Nos da información verídica para contactar con el equipo de soporte técnico de la página.


#### Formularios
- **Input text:** Entrada de texto estándar
- **Input password:** Con toggle de visibilidad
- **Select dropdown:** Con búsqueda
- **Checkbox:** Individual y grupos

#### Navegación
- **Navbar:** Barra superior de navegación
- **Sidebar:** Menú lateral colapsable
- **Tabs:** Pestañas para contenido

#### Feedback
- **Toast notifications:** Mensajes temporales
- **Modals:** Ventanas emergentes
- **Alerts:** Avisos en contexto
- **Loading spinners:** Indicadores de carga
- **Progress bars:** Barras de progreso

#### Visualización de datos
- **Cards:** Tarjetas de información
- **Tables:** Tablas de datos
- **Charts:** Gráficos (si aplica)
- **Stats cards:** Tarjetas de estadísticas

---

### Responsive Design

**Breakpoints definidos:**
- **Mobile:** 402px+
- **Desktop:** 1024px+

### Accesibilidad

**Criterios implementados:**
- Contraste de colores según WCAG 2.1 AA
- Textos alternativos para imágenes
- Navegación por teclado
- Estados de foco visibles
- Jerarquía semántica de encabezados



## 📋 Checklist de Implementación

### Para el Equipo de Desarrollo

**Antes de comenzar un sprint:**
- [ ] Revisar el prototipo de Figma correspondiente al sprint
- [ ] Identificar todos los componentes necesarios
- [ ] Validar los endpoints de backend requeridos
- [ ] Confirmar las historias de usuario vinculadas

**Durante el desarrollo:**
- [ ] Consultar especificaciones de diseño (colores, tipografía, espaciado)
- [ ] Implementar estados de los componentes (hover, active, disabled)
- [ ] Validar responsive design en todos los breakpoints
- [ ] Solicitar feedback del diseñador si hay dudas

**Al finalizar:**
- [ ] Comparar implementación con el prototipo
- [ ] Actualizar este documento con notas de implementación
- [ ] Marcar las pantallas como completadas

---

## 🎨 Assets y Recursos

### Imágenes y Gráficos

**Ubicación:** `src/frontend/assets/images/`

**Assets exportados de Figma:**
- Logotipo (SVG, PNG)
- Iconos personalizados (SVG)
- Imágenes de placeholder (PNG, WebP)
- Ilustraciones (SVG)

**Convención de nombres:**
```
[tipo]-[descripcion]-[tamaño].[extension]

Ejemplos:
icon-user-24px.svg
logo-primary-full.svg
img-hero-1920x1080.webp
illus-empty-state.svg
```


### Preguntas Frecuentes

**P: ¿Dónde encuentro las medidas exactas de espaciado?**  
R: En Figma, selecciona cualquier elemento y revisa el panel de propiedades. Todos los espaciados siguen el sistema de 8px grid.

**P: ¿Puedo modificar un componente para un caso específico?**  
R: Consulta primero con el equipo. Si es un caso único, crea una variante. Si es recurrente, actualiza el componente base en Figma.

**P: ¿Cómo exporto assets de Figma?**  
R: Selecciona el elemento → Export → Configura formato y resolución → Export [nombre].

---

## Contacto y Soporte

**Responsable de diseño:** Lucero Scharff🐞  
**Canal de comunicación:** [Slack, Discord, etc.]  
**Horario de disponibilidad:** 7:30 am - 6:30 pm

**Para dudas sobre el prototipo:**
1. Revisar este documento primero
2. Consultar directamente en Figma (comentarios)
3. Preguntar en el canal del equipo
4. Agendar sesión de revisión de diseño

---

## 🔗 Referencias Útiles

**Documentación relacionada:**
- `README.md` - Información general del proyecto
- `docs/sprint-planning/` - Planificación de sprints
- `CONTRIBUTING.md` - Guía de contribución
- `docs/retrospectivas/` - Aprendizajes de los sprints

**Recursos externos:**
- [Guía de Figma](https://help.figma.com)
- [Material Design Guidelines](https://m3.material.io)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines)

---

**Última actualización:** 13/10/2025  
**Mantenido por:** Lucero Scharff🐞  
**Versión del documento:** 1.0

