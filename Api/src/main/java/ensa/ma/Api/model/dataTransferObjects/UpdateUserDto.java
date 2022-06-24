package ensa.ma.Api.model.dataTransferObjects;

import ensa.ma.Api.model.enumFolder.UserRole;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class UpdateUserDto {

    private final Long id;
    private final String firstName;
    private final String lastName;
    private final String email;
    private final String username;
    private final UserRole userRole;
}
