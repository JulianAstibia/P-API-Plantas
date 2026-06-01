from deep_translator import GoogleTranslator, exceptions
from ..models import Traducciones


class TraduccionError(Exception):
    pass

def traducir(text, target):
    try:
        tr_bd= Traducciones.objects.filter(
            texto_original = text,
            idioma_objetivo = target
        ).first()
        if tr_bd:
            return tr_bd.traduccion

        traducir_texto = GoogleTranslator(
            source= "auto",
            target= target
        ).translate(text)

        Traducciones.objects.create(
            texto_original = text,
            idioma_objetivo = target,
            traduccion = traducir_texto
        )

        return traducir_texto
    
    except exceptions.TooManyRequests:
        raise TraduccionError("Limite de traducciones alcanzadas")
    
    except exceptions.TranslationNotFound:
        raise TraduccionError("No se pudo traducir el texto")
    
    except exceptions.RequestError:
        raise TraduccionError("No se pudo conectar con el servidor de traducción")
    
    except Exception as e:
        raise TraduccionError(f"Error inesperado: {str(e)}")
