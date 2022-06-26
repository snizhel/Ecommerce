package ensa.ma.Api.model.dataTransferObjects;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegistrationRequest {

    private  String firstName;
    private  String lastName;
    private  String password;
    private  String email;

}
