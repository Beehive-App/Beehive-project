import { Box, Button, TextField, Typography } from '@mui/material'
import { BeehiveAppLayout } from '../../layout/BeehiveAppLayout'

export const ConfigPage = () => {
  return (
    <>
        <BeehiveAppLayout>
            <Box className="animate__animated animate__fadeIn" 
                sx={{
                    height:'calc(100% - 64px)',
                    width:1,
                    display:'flex',
            }}>
                <Box sx={{display:'flex',alignItems:'center', width:1,justifyContent:'space-between' }}>
                    <Typography variant="subtitle" p={3} sx={{width:'10%',display:'flex',alignItems:'center',justifyContent:'flex-start' }}>
                        Restablecer contraseña: Pulsa el botón para enviar un enlace de restablecimiento de contraseña a tu dirección de correo
                    </Typography>
                    <Button>
                        Enviar
                    </Button>
                </Box>
            </Box>
        </BeehiveAppLayout>
    </>
  )
}
