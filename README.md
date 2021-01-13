# Bienvenido a este proyecto de ejemplo usando Titanium Classic Framework

Bienvenido a este proyecto de ejemplo, que pretende ilustrar una primera toma de contacto con este framework desde el principio, cubriendo los aspectos básicos: elementos de IU comunes, comunicación con el backend, persistencia, navegación, uso de APIS de terceros (notificaciones, mapas), etc. Este proyecto está construido usando la parte clásica del mismo, en otro proyecto se replicará esto mismo usando Alloy.

He configurado el entorno de trabajo tanto en PC y como en Mac, decantándome por este último S.O. al permitir exportar proyectos de iOS.

## Configuración en PC

Para PC He usado la siguiente configuración:

- Java 8 64bit 
- Congigurar las variables de entorno:
    - variable JAVA_HOME apuntando a C:/Program Files/jdk1.8.0_271
    - variable ANDROID_HOME apuntando a C:\Users\my-user\AppData\Local\Android\Sdk
- Añadir al PATH esta ruta %JAVA_HOME%\bin
- Habilidar la virtualización, tanto en la BIOS como ajustes de Windows: Hyper-V
- Definir la ruta de Android SDK dentro de Appcelerator Studio: Preferences/Platforms/Android/General/Android SDK Home
- OPCIONAL: instalar el emulador Genymotion.
- Podemos obtener un mensaje en los logs de compilación de Appcelerator Studio que dice que nos falta por aceptar licencias del SDK de Android, a pesar de haberlas aceptado al instalarlo. Parece un bug, pero tiene solución: abrimos una terminal y lanzamos lo siguiente para entrar en la aceptación de las licencias: `%ANDROID_HOME%/tools/bin/sdkmanager --licenses`

## Configuración en Mac

El principal problema que encontré en Mac fue que Appcelerator Studio no detectaba los SDK de Java, Android ni XCode. Finalmente siguendo estos pasos la plataforma es capaz de funcionar (siempre según mi experiendia particular):

- instalar el Xcode 11.4 (SDK hasta 13 -> en terminal "xcodebuild -showsdks")
-  Android studio, útima versión
- Git viene con Xcode, no hay que instalarlo
- Java no lo instalo, dejo que el instalador instale esta dependencia (instala la versión 11, con la 8 de 64 bits no funcionaba, no reconocía Java ni añadiéndolo al PATH)
- El último paso es instalar Appcelerator y dejar que instale cli y Java él solo
- Tras actualizar y esperar el comportamiento errático, logra detectar el sdk de ios
- Actualizar o instalar última versión de Xcode (ahora sí detecta el SDK)
- Para el sdk de android debemos indicárselo a mano (ver imagen a continuación):

![SDK paths](./readme_data/01sdk_path.png)

### Otra información útil acerca de la instalación en Mac
----

**Xcode soportados**

https://wiki.appcelerator.org/display/guides2/Titanium+Compatibility+Matrix#TitaniumCompatibilityMatrix-SupportedversionsofXcode

**Borrar otras versiones de java**

```
Sudo rm -rf /Library/Java/JavaVirtualMachines/jdk(version).jdk
Sudo rm -rf /Library/PreferencePanes/JavaControlPanel.prefPane
Sudo rm -rf /Library/Internet\ Plug-Ins/JavaAppletPlugin.plugin
sudo rm -rf ˜/Library/Application\ Support/Oracle/Java
```

**Ruta SDK Android**

`/Users/usuario/Library/Android`

**Ruta SDK iOS**

`/Applications/Xcode.app/Contents/Developer`

**Matriz de compatibilidad**

`https://wiki.appcelerator.org/display/guides2/Titanium+Compatibility+Matrix#TitaniumCompatibilityMatrix-SupportedversionsofXcode`



# Puesta en marcha

## Documentación oficial

|TÍTULO|CONTENIDO|URL|
|--|--|--|
|Appcelerator Platform|Contiene documentación global de los componente de la plataforma: Titanium SDK, IDE Appcelerator, Framework Alloy...| https://docs.appcelerator.com/platform/latest/#!/api/Global|
|Wiki Appcelerator| Wiki sobre documentación de Titanium SDK| https://wiki.appcelerator.org/display/guides2/Titanium+SDK|
|Amplify Dashboard|Panel de control de las aplicaciones|https://platform.axway.com/#/app|

----

# Titanium SDK "know how"

## Básico

`Window` es la vista padre de la que pueden colgar hijos. En la mayoría de casos puede existir una única ventana `Window`, pero en el iPad o tablet Android por ejemplo, hay que tener en cuenta que puede haber vista general y detalle.

La filosofía de creación de las interfaces gráficas en Titanium es bastante simple, todo es javascript y se basa de anidar vistas para ir construyendo los layouts, con atributos pasados a partir de un objeto que contendrá las propiedades de la vista.

**Creación de la vista inicial**
```
var window = Ti.UI.createWindow(
{
	title: 'title',
	navBarHidden : true //default is false, esto oculta la barra de navegación. 
});

window.open();

//View

var view = Ti.UI.createView(
{
	backgroudColor: 'Red',
	height: '25dp',
	width: '50%'
});

window.add(view);
```
Si se usa navigation group, entonces se llama a ese grupo y se pasa como parámetro la ventana que se quiere abrir.

- En Android: se agrega `Ti.UI.createWindow({}}`
- En iOS: se agrega `Titanium.UI.iOS.NavigationWindow`:

```
// get the application folder based on if the device is a tablet or handheld
if (Util.isTablet()) {
    ApplicationWindow = require('ui/tablet/ApplicationWindow');
    self = new ApplicationWindow();   
} else {
    // check if the device is ios, android or mobile web
    ApplicationWindow = require('ui/handheld/ApplicationWindow');
    
    if (Util.isIPhone()) {
        navInit = Ti.UI.iOS.createNavigationWindow;    
    } else if (Util.isAndroid()) {
        navInit = false;
    } else {
        navInit = Ti.UI.MobileWeb.createNavigationGroup;
    }  
    
    var applicationWindow = new ApplicationWindow();
    // ios, blackberry or mobileweb
    if (navInit !== false) {
        self = navInit({ window : applicationWindow });    
    } else { // android
        self = applicationWindow;   
    }
}
```

**Iconos de la aplicación**

**Splash screen**


## Fichero `tiapp.xml`

## Location



